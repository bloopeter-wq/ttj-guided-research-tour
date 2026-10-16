(function(){
  'use strict';
  if (window.__ttjUxRefine) return;
  window.__ttjUxRefine = true;

  function q(sel, root){ return (root || document).querySelector(sel); }
  function qa(sel, root){ return Array.from((root || document).querySelectorAll(sel)); }

  function scrollToTarget(el){
    if (!el) return;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({behavior: reduced ? 'auto' : 'smooth', block:'start'});
  }

  function buildSectionNav(opts){
    if (!opts || !opts.anchor || !opts.sections || q('.ux-section-nav[data-ux-nav="'+opts.key+'"]')) return null;

    var scope=opts.scope || document;
    var valid=[];
    opts.sections.forEach(function(item){
      var el=q(item[1],scope);
      if (!el) return;
      var targetId=el.id || item[2];
      if (!el.id) el.id=targetId;
      valid.push([item[0],el,targetId]);
    });
    if (!valid.length) return null;

    var nav=document.createElement('nav');
    nav.className='ux-section-nav';
    nav.dataset.uxNav=opts.key;
    nav.setAttribute('aria-label',opts.aria || 'Page sections');
    nav.innerHTML='<div class="ux-section-nav-inner">'+valid.map(function(item,i){
      return '<button type="button" data-ux-target="'+item[2]+'" class="'+(i===0?'active':'')+'">'+item[0]+'</button>';
    }).join('')+'</div>';
    opts.anchor.insertAdjacentElement('afterend',nav);

    /* A small holder lets the navigator become viewport-fixed without changing page height.
       This is more reliable than native sticky positioning inside the site's clipped artwork containers. */
    var holder=document.createElement('div');
    holder.className='ux-section-nav-holder';
    nav.parentNode.insertBefore(holder,nav);
    function updatePinnedNav(){
      var scopeVisible=!opts.scope || (opts.scope.getClientRects && opts.scope.getClientRects().length>0);
      var header=q('.header');
      var headerHeight=header ? Math.ceil(header.getBoundingClientRect().height) : 0;
      var shouldPin=scopeVisible && holder.getBoundingClientRect().top<=headerHeight;
      nav.classList.toggle('is-fixed',shouldPin);
      nav.style.top=shouldPin ? headerHeight+'px' : '';
      holder.style.height=shouldPin ? nav.offsetHeight+'px' : '0px';
    }
    window.addEventListener('scroll',updatePinnedNav,{passive:true});
    window.addEventListener('resize',updatePinnedNav);
    window.addEventListener('hashchange',function(){setTimeout(updatePinnedNav,0);});
    requestAnimationFrame(updatePinnedNav);

    qa('button',nav).forEach(function(btn){
      btn.addEventListener('click',function(){
        scrollToTarget(document.getElementById(btn.dataset.uxTarget));
      });
    });

    if('IntersectionObserver' in window){
      var obs=new IntersectionObserver(function(entries){
        var visible=entries
          .filter(function(e){return e.isIntersecting && !e.target.closest('[hidden]');})
          .sort(function(a,b){return b.intersectionRatio-a.intersectionRatio;})[0];
        if(!visible) return;
        qa('button',nav).forEach(function(btn){
          var active=btn.dataset.uxTarget===visible.target.id;
          btn.classList.toggle('active',active);
          if(active) btn.setAttribute('aria-current','true');
          else btn.removeAttribute('aria-current');
        });
      },{rootMargin:'-18% 0px -64% 0px',threshold:[0,.12,.3,.6]});
      valid.forEach(function(item){obs.observe(item[1]);});
    }
    return nav;
  }

  function routeAndScroll(section, selector){
    try {
      history.pushState(null,'','#'+section);
      if (typeof window.navigate === 'function') window.navigate(section);
      else location.hash = section;
    } catch(e){ location.hash = section; }
    var tries = 0;
    var timer = setInterval(function(){
      var el = q(selector);
      if (el && !el.closest('[hidden]')) {
        clearInterval(timer);
        setTimeout(function(){ scrollToTarget(el); }, 60);
      } else if (++tries > 50) clearInterval(timer);
    }, 60);
  }

  function addSkipLink(){
    if (q('.ux-skip-link')) return;
    var a=document.createElement('a');
    a.className='ux-skip-link';
    a.href='#tour';
    a.textContent='Skip to main content';
    a.addEventListener('click',function(e){
      e.preventDefault();
      var section=(location.hash||'#tour').slice(1);
      var target=section==='explore'?q('#data-view'):section==='resources'?q('#resources-view'):q('#tour');
      if(target){ target.setAttribute('tabindex','-1'); target.focus({preventScroll:true}); scrollToTarget(target); }
    });
    document.body.insertBefore(a,document.body.firstChild);
  }

  function refineHome(){
    var page=q('#learn-traditional-page'), hero=q('#hb2-hero');
    if(!page || !hero || page.dataset.uxRefined==='1') return false;
    page.dataset.uxRefined='1';

    /* Keep the themes compact until somebody chooses one. */
    qa('.lt-thread-list details',page).forEach(function(d){ d.open=false; });

    [
      ['.lt-snapshot','ux-home-snapshot'],
      ['.lt-core','ux-home-core'],
      ['.lt-findings','ux-home-findings'],
      ['.lt-threads','ux-home-themes'],
      ['.lt-next','ux-home-next'],
      ['.lt-method','ux-home-method']
    ].forEach(function(item){
      var el=q(item[0],page);
      if(el && !el.id) el.id=item[1];
    });

    var targets=['#xv-round-panel','#xv-demographics','#xv-limits','#xv-quotes','#xv-round-panel','#xv-round-panel','#xv-institutions'];
    qa('.lt-finding',page).forEach(function(card,i){
      var copy=q('.lt-finding-copy',card);
      if(!copy || q('.ux-evidence-link',copy)) return;
      var b=document.createElement('button');
      b.type='button'; b.className='ux-evidence-link'; b.textContent='See the evidence →';
      b.addEventListener('click',function(){ routeAndScroll('explore',targets[i]||'#xv-round-panel'); });
      copy.appendChild(b);
    });

    /* Key findings: compact accordion treatment so each finding has a clear beginning and end. */
    qa('.lt-finding',page).forEach(function(card,i){
      if(card.dataset.accordionReady==='1') return;
      card.dataset.accordionReady='1';
      var copy=q('.lt-finding-copy',card);
      var label=copy&&q('span',copy);
      var title=copy&&q('h3',copy);
      if(!copy || !label || !title) return;

      var body=document.createElement('div');
      body.className='lt-finding-body';
      body.id='lt-finding-body-'+String(i+1);
      while(card.firstChild) body.appendChild(card.firstChild);

      var toggle=document.createElement('button');
      toggle.type='button';
      toggle.className='lt-finding-toggle';
      toggle.setAttribute('aria-controls',body.id);
      toggle.setAttribute('aria-expanded',i===0?'true':'false');
      toggle.innerHTML='<span>'+label.textContent+'</span><strong>'+title.textContent+'</strong><i aria-hidden="true">+</i>';

      card.appendChild(toggle);
      card.appendChild(body);
      card.classList.toggle('is-open',i===0);

      toggle.addEventListener('click',function(){
        var open=!card.classList.contains('is-open');
        card.classList.toggle('is-open',open);
        toggle.setAttribute('aria-expanded',open?'true':'false');
      });
    });
    return true;
  }

  function refineExplore(){
    var root=q('#data-view.ttj-explore-v2'), page=root&&q('.xv-page',root), hero=page&&q('.xv-hero',page);
    if(!root || !page || !hero || root.dataset.uxRefined==='1') return false;
    root.dataset.uxRefined='1';

    [
      ['.xv-rounds','ux-explore-rounds'],
      ['.xv-demographics','ux-explore-audiences'],
      ['.xv-institutions','ux-explore-institutions'],
      ['.xv-quotes','ux-explore-voices'],
      ['.xv-limits','ux-explore-protections']
    ].forEach(function(item){
      var el=q(item[0],root);
      if(el && !el.id) el.id=item[1];
    });
    return true;
  }

  function refineResources(){
    var root=q('#resources-view.ttj-resources-v2');
    if(!root || root.dataset.uxRefined==='1') return false;
    root.dataset.uxRefined='1';

    var resourceHero=q('.rv-hero',root);
    if(resourceHero){
      buildSectionNav({
        key:'resources',
        scope:root,
        anchor:resourceHero,
        aria:'Use the Research sections',
        sections:[
          ['Downloads','.rv-downloads','ux-resource-downloads'],
          ['Message formula','#tool-1','ux-resource-formula'],
          ['Say this / not that','#tool-2','ux-resource-language'],
          ['Talking points','#tool-3','ux-resource-points'],
          ['Sector','#tool-4','ux-resource-sector'],
          ['Strong / weak words','#tool-6','ux-resource-words'],
          ['Checklist','#tool-7','ux-resource-checklist'],
          ['Lead with decision','#tool-8','ux-resource-decision']
        ]
      });
    }

    var heroInner=q('.rv-hero-inner',root), index=q('.rv-tool-index',root);
    if(heroInner && index && !q('.ux-resource-guide',root)){
      var guide=document.createElement('div');
      guide.className='ux-resource-guide';
      guide.innerHTML='<span>Tools by task</span><div class="ux-resource-groups">'+
        '<div><b>Write</b><div class="ux-resource-guide-buttons">'+
          '<button type="button" data-tool="#tool-1">Message builder</button>'+
          '<button type="button" data-tool="#tool-2">Concrete examples</button>'+
          '<button type="button" data-tool="#tool-3">Talking points</button>'+
        '</div></div>'+
        '<div><b>Adapt</b><div class="ux-resource-guide-buttons">'+
          '<button type="button" data-tool="#tool-4">Sector questions</button>'+
          '<button type="button" data-tool="#tool-6">Language choices</button>'+
        '</div></div>'+
        '<div><b>Check</b><div class="ux-resource-guide-buttons">'+
          '<button type="button" data-tool="#tool-7">Drafting checklist</button>'+
          '<button type="button" data-tool="#tool-8">Decision-first framing</button>'+
        '</div></div>'+
      '</div>';
      index.insertAdjacentElement('beforebegin',guide);
      qa('button',guide).forEach(function(btn){
        btn.addEventListener('click',function(){ scrollToTarget(q(btn.dataset.tool,root)); });
      });
    }
    return true;
  }

  function refineSearch(){
    if(q('#ux-site-search')) return true;
    var header=q('.header');
    var nav=q('.nav',header);
    if(!header || !nav || !q('#learn-traditional-page') || !q('#data-view.ttj-explore-v2') || !q('#resources-view.ttj-resources-v2')) return false;

    var trigger=document.createElement('button');
    trigger.type='button';
    trigger.className='ux-site-search-trigger';
    trigger.setAttribute('aria-haspopup','dialog');
    trigger.setAttribute('aria-controls','ux-site-search');
    trigger.innerHTML='<span>Search</span>';
    header.appendChild(trigger);

    var overlay=document.createElement('div');
    overlay.id='ux-site-search';
    overlay.className='ux-search-overlay';
    overlay.hidden=true;
    overlay.innerHTML=
      '<div class="ux-search-backdrop" data-search-close></div>'+
      '<section class="ux-search-dialog" role="dialog" aria-modal="true" aria-labelledby="ux-search-title">'+
        '<div class="ux-search-top">'+
          '<div><span class="ux-search-kicker">Search</span><h2 id="ux-search-title">Search the research</h2></div>'+
          '<button type="button" class="ux-search-close" data-search-close>Close</button>'+
        '</div>'+
        '<label class="ux-search-box" for="ux-search-input">'+
          '<span>Search</span>'+
          '<input id="ux-search-input" type="search" autocomplete="off" placeholder="Try “health care”, “Republicans”, “housing” or “penalties”…" />'+
        '</label>'+
        '<div class="ux-search-help"><span>Searches What We Learned, Explore the Data and Resources.</span><span><kbd>Esc</kbd> to close</span></div>'+
        '<div class="ux-search-results" id="ux-search-results" aria-live="polite"></div>'+
      '</section>';
    document.body.appendChild(overlay);

    var input=q('#ux-search-input',overlay);
    var results=q('#ux-search-results',overlay);
    var lastFocus=null;
    var searchIndex=[];

    function cleanText(value){
      return String(value||'').replace(/\s+/g,' ').trim();
    }
    function normalise(value){
      return cleanText(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    }
    function addItem(page,pageKey,title,text,target,extra){
      var item={
        page:page,
        pageKey:pageKey,
        title:cleanText(title),
        text:cleanText(text),
        target:target
      };
      if(extra) Object.keys(extra).forEach(function(k){item[k]=extra[k];});
      item.search=normalise(item.title+' '+item.text);
      searchIndex.push(item);
    }
    function ensureId(el,prefix,i){
      if(!el.id) el.id=prefix+'-'+String(i+1);
      return '#'+el.id;
    }

    function buildSearchIndex(){
      searchIndex=[];

      var home=q('#learn-traditional-page');
      if(home){
        [
          ['At a glance','.lt-snapshot','#ux-home-snapshot'],
          ['Central finding','.lt-core','#ux-home-core'],
          ['Themes','.lt-threads','#ux-home-themes'],
          ['Next steps','.lt-next','#ux-home-next'],
          ['About the research','.lt-method','#ux-home-method']
        ].forEach(function(row){
          var el=q(row[1],home);
          if(el) addItem('What We Learned','tour',row[0],el.innerText,row[2]);
        });
        qa('.lt-finding',home).forEach(function(el,i){
          var title=q('h3',el);
          addItem('What We Learned','tour',title ? title.textContent : 'Key finding '+(i+1),el.textContent,ensureId(el,'ux-search-finding',i));
        });
        qa('.lt-thread-list details',home).forEach(function(el,i){
          var title=q('summary',el);
          addItem('What We Learned','tour',title ? title.textContent : 'Theme '+(i+1),el.innerText,'#ux-home-themes');
        });
      }

      var roundEntries=[
        {
          n:1,
          title:'Round 1 · Main concerns about government use of AI',
          text:'Public services harder to use. One mistake can harm millions. Misleading the public with fake media. No one takes responsibility for harm. Wrongful fraud flags or benefit cuts. MaxDiff. March 6–9 2026. 1,242 likely voters.'
        },
        {
          n:2,
          title:'Round 2 · Which broader AI harms feel most serious?',
          text:'Health insurer uses AI to deny doctor-recommended care. Data centres strain water and power. Government outsources programs to tech firms. Benefits housing or jobs cut without accountability. Tracking data without meaningful consent. Bias and discrimination. MaxDiff. March 20–23 2026. 1,193 likely voters.'
        },
        {
          n:3,
          title:'Round 3 · Who controls consequential AI decisions?',
          text:'Health insurance companies. Landlords. Private companies running public programs. State government officials. Big Tech companies. Employers. Institutional trust and permission. April 24–27 2026. 1,167 likely voters.'
        },
        {
          n:4,
          title:'Round 4 · Concrete harms and lived consequences',
          text:'Doctor-recommended treatment denied. Social Security or disability cut off. Benefits fraud. Groceries pricing. Job rejection with no human involved. Workplace monitoring. Forced to deal with AI instead of a person. Medicaid. Eviction surveillance. Housing. July 2–5 2026. 1,164 likely voters.'
        },
        {
          n:5,
          title:'Round 5 · What rules are people willing to support?',
          text:'Meaningful penalties. Off switches. Safety proof before release. High-stakes bans. Safety proof before use. Community boards with legal authority. Full policy package. July 24–27 2026. 1,058 likely voters.'
        }
      ];
      roundEntries.forEach(function(item){
        addItem('Explore the Data','explore',item.title,item.text,'#ux-explore-rounds',{round:item.n});
      });

      var explore=q('#data-view.ttj-explore-v2');
      if(explore){
        [
          ['Audiences','.xv-demographics','#ux-explore-audiences'],
          ['Institutions','.xv-institutions','#ux-explore-institutions'],
          ['What people said','.xv-quotes','#ux-explore-voices'],
          ['Protections','.xv-limits','#ux-explore-protections']
        ].forEach(function(row){
          var el=q(row[1],explore);
          if(el) addItem('Explore the Data','explore',row[0],el.innerText,row[2]);
        });
      }

      var resources=q('#resources-view.ttj-resources-v2');
      if(resources){
        qa('.rv-tool',resources).forEach(function(el,i){
          if(el.offsetParent===null && !el.closest('#resources-view[hidden]')) return;
          var eyebrow=q('.rv-eyebrow',el);
          var h2=q('h2',el);
          var title=[eyebrow&&eyebrow.textContent,h2&&h2.textContent].filter(Boolean).join(' · ') || 'Resource '+(i+1);
          addItem('Resources','resources',title,el.innerText,'#'+el.id);
        });
        var downloads=q('.rv-downloads',resources);
        if(downloads) addItem('Resources','resources','Downloads and source materials',downloads.innerText,'#ux-resource-downloads');
      }
    }

    function snippet(item,query){
      var text=cleanText(item.text);
      if(!text) return '';
      var lower=normalise(text);
      var term=normalise(query).split(' ').filter(Boolean)[0]||'';
      var at=term ? lower.indexOf(term) : -1;
      var start=at>70 ? at-70 : 0;
      var end=Math.min(text.length,start+190);
      var out=text.slice(start,end);
      if(start>0) out='…'+out;
      if(end<text.length) out=out+'…';
      return out;
    }

    function search(query){
      var terms=normalise(query).split(' ').filter(function(t){return t.length>1;});
      if(!terms.length) return [];
      return searchIndex.map(function(item){
        var score=0;
        var title=normalise(item.title);
        var all=true;
        terms.forEach(function(term){
          if(item.search.indexOf(term)<0) all=false;
          if(title.indexOf(term)>=0) score+=8;
          else if(item.search.indexOf(term)>=0) score+=2;
        });
        if(normalise(item.title).indexOf(normalise(query))>=0) score+=10;
        return all ? {item:item,score:score} : null;
      }).filter(Boolean).sort(function(a,b){return b.score-a.score;}).slice(0,12).map(function(x){return x.item;});
    }

    function renderResults(query){
      var found=search(query);
      if(!normalise(query)){
        results.innerHTML=
          '<div class="ux-search-empty">'+
            '<strong>Search the research.</strong>'+
            '<p>Find polling rounds, findings, institutions, protections and practical tools.</p>'+
            '<div class="ux-search-suggestions">'+
              '<button type="button" data-search-suggestion="health care">Health care</button>'+
              '<button type="button" data-search-suggestion="human">Human recourse</button>'+
              '<button type="button" data-search-suggestion="Republicans">Republicans</button>'+
              '<button type="button" data-search-suggestion="housing">Housing</button>'+
              '<button type="button" data-search-suggestion="penalties">Penalties</button>'+
            '</div>'+
          '</div>';
        qa('[data-search-suggestion]',results).forEach(function(btn){
          btn.addEventListener('click',function(){input.value=btn.dataset.searchSuggestion;renderResults(input.value);input.focus();});
        });
        return;
      }
      if(!found.length){
        results.innerHTML='<div class="ux-search-empty"><strong>No matches found.</strong><p>Try a broader term or a different phrase.</p></div>';
        return;
      }
      results.innerHTML=
        '<div class="ux-search-count">'+found.length+' result'+(found.length===1?'':'s')+'</div>'+
        found.map(function(item,i){
          return '<button type="button" class="ux-search-result" data-search-result="'+i+'">'+
            '<span class="ux-search-page">'+item.page+'</span>'+
            '<strong>'+item.title.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</strong>'+
            '<span class="ux-search-snippet">'+snippet(item,query).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</span>'+
            '<b>Open →</b>'+
          '</button>';
        }).join('');
      qa('[data-search-result]',results).forEach(function(btn){
        btn.addEventListener('click',function(){
          var item=found[Number(btn.dataset.searchResult)];
          if(!item) return;
          closeSearch();
          if(item.round){
            routeAndScroll('explore','#ux-explore-rounds');
            var tries=0;
            var timer=setInterval(function(){
              var tab=q('[data-round-select="'+item.round+'"]');
              if(tab){
                clearInterval(timer);
                tab.click();
                setTimeout(function(){scrollToTarget(q('#ux-explore-rounds'));},80);
              } else if(++tries>40) clearInterval(timer);
            },60);
          } else {
            routeAndScroll(item.pageKey,item.target);
          }
        });
      });
    }

    function openSearch(){
      buildSearchIndex();
      lastFocus=document.activeElement;
      overlay.hidden=false;
      document.body.classList.add('ux-search-open');
      input.value='';
      renderResults('');
      setTimeout(function(){input.focus();},30);
    }
    function closeSearch(){
      overlay.hidden=true;
      document.body.classList.remove('ux-search-open');
      if(lastFocus && lastFocus.focus) lastFocus.focus();
    }

    trigger.addEventListener('click',openSearch);
    qa('[data-search-close]',overlay).forEach(function(el){el.addEventListener('click',closeSearch);});
    input.addEventListener('input',function(){renderResults(input.value);});
    document.addEventListener('keydown',function(e){
      var tag=(document.activeElement && document.activeElement.tagName || '').toLowerCase();
      var typing=tag==='input'||tag==='textarea'||tag==='select'||document.activeElement&&document.activeElement.isContentEditable;
      if(e.key==='/' && !typing && overlay.hidden){
        e.preventDefault();
        openSearch();
      } else if(e.key==='Escape' && !overlay.hidden){
        e.preventDefault();
        closeSearch();
      }
    });

    return true;
  }

  function addOrientation(){
    if(q('#ux-orientation')) return;
    if(!q('.lt-snapshot') || !q('#ux-explore-rounds') || !q('#resources-view .rv-tool')) return;
    var o=document.createElement('div');
    o.id='ux-orientation'; o.className='ux-orientation'; o.setAttribute('aria-hidden','true');
    o.innerHTML='<b></b><span></span>'; document.body.appendChild(o);
    var b=q('b',o), s=q('span',o), current='';

    function set(label,detail){
      var key=label+'|'+detail; if(key===current) return; current=key;
      b.textContent=label; s.textContent=detail;
    }
    function updateVisibility(){
      var footer=q('.footer');
      var footerVisible=footer && footer.getBoundingClientRect().top < window.innerHeight;
      o.classList.toggle('show',window.scrollY>420 && window.innerWidth>760 && !footerVisible);
    }
    window.addEventListener('scroll',updateVisibility,{passive:true}); window.addEventListener('resize',updateVisibility); updateVisibility();

    if(!('IntersectionObserver' in window)) return;
    var items=[
      ['What We Learned','Research at a glance','.lt-snapshot'],
      ['What We Learned','Central finding','.lt-core'],
      ['What We Learned','Key findings','.lt-findings'],
      ['What We Learned','Themes','.lt-threads'],
      ['What We Learned','Next steps','.lt-next'],
      ['Explore','Five rounds','#ux-explore-rounds'],
      ['Explore','Audiences','#ux-explore-audiences'],
      ['Explore','Institutions','#ux-explore-institutions'],
      ['Explore','What people said','#ux-explore-voices'],
      ['Explore','Protections','#ux-explore-protections']
    ];
    qa('#resources-view .rv-tool').forEach(function(el,i){ items.push(['Resources','Tool '+String(i+1).padStart(2,'0'), '#'+el.id]); });
    var obs=new IntersectionObserver(function(entries){
      var v=entries.filter(function(e){return e.isIntersecting&&!e.target.closest('[hidden]');}).sort(function(a,b){return b.intersectionRatio-a.intersectionRatio;})[0];
      if(!v) return;
      var item=items.find(function(x){return q(x[2])===v.target;});
      if(item) set(item[0],item[1]);
    },{rootMargin:'-22% 0px -62% 0px',threshold:[0,.1,.3]});
    items.forEach(function(item){var el=q(item[2]);if(el)obs.observe(el);});
  }

  function boot(){
    addSkipLink();
    refineHome(); refineExplore(); refineResources();
    if(refineHome() || refineExplore() || refineResources()){}
    refineSearch();
  }

  boot();
  var timer=setInterval(boot,100);
  setTimeout(function(){clearInterval(timer);boot();},10000);
})();