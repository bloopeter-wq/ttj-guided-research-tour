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

  function copyDeepLink(params, hash, button, idleLabel){
    var url=new URL(window.location.href);
    Object.keys(params||{}).forEach(function(key){url.searchParams.set(key,String(params[key]));});
    url.hash=hash||location.hash||'tour';
    var text=url.toString();
    var done=function(ok){
      if(!button) return;
      button.textContent=ok?'Link copied':'Copy unavailable';
      setTimeout(function(){button.textContent=idleLabel||'Copy link';},1500);
    };
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(function(){done(true);}).catch(function(){done(false);});
    } else done(false);
  }

  function refineHeader(){
    var header=q('.header');
    if(!header || header.dataset.uxCompactReady==='1') return !!header;
    header.dataset.uxCompactReady='1';
    var update=function(){
      var compact=window.scrollY>96 && window.innerWidth>760 && !document.body.classList.contains('ux-search-open');
      header.classList.toggle('ux-header-compact',compact);
    };
    window.addEventListener('scroll',update,{passive:true});
    window.addEventListener('resize',update);
    update();
    return true;
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

    /* Always render secondary links in the same top-to-bottom order as their live sections. */
    valid.sort(function(a,b){
      if(a[1]===b[1]) return 0;
      var relationship=a[1].compareDocumentPosition(b[1]);
      if(relationship & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
      if(relationship & Node.DOCUMENT_POSITION_PRECEDING) return 1;
      return 0;
    });

    var nav=document.createElement('nav');
    nav.className='ux-section-nav';
    nav.dataset.uxNav=opts.key;
    nav.setAttribute('aria-label',opts.aria || 'Page sections');
    nav.innerHTML='<div class="ux-section-nav-inner">'+valid.map(function(item,i){
      return '<button type="button" data-ux-target="'+item[2]+'" class="'+(i===0?'active':'')+'">'+item[0]+'</button>';
    }).join('')+'</div>';
    opts.anchor.insertAdjacentElement(opts.position==='before' ? 'beforebegin' : 'afterend',nav);

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
        qa('button',nav).forEach(function(item){
          var active=item===btn;
          item.classList.toggle('active',active);
          if(active) item.setAttribute('aria-current','true');
          else item.removeAttribute('aria-current');
        });
        try { btn.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'}); } catch(e) {}
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
      ['.lt-polling-intro','ux-home-polling'],
      ['.lt-core','ux-home-core'],
      ['.lt-findings','ux-home-findings'],
      ['.lt-meaning','ux-home-meaning'],
      ['.lt-threads','ux-home-themes'],
      ['.lt-next','ux-home-next'],
      ['.lt-method','ux-home-method']
    ].forEach(function(item){
      var el=q(item[0],page);
      if(el && !el.id) el.id=item[1];
    });

    buildSectionNav({
      key:'home',
      scope:page,
      anchor:hero,
      position:'before',
      aria:'What We Learned sections',
      sections:[
        ['About the polling','.lt-polling-intro','ux-home-polling'],
        ['Central finding','.lt-core','ux-home-core'],
        ['Key findings','.lt-findings','ux-home-findings'],
        ['Themes','.lt-threads','ux-home-themes'],
        ['Next steps','.lt-next','ux-home-next'],
        ['About','.lt-method','ux-home-method']
      ]
    });

    var targets=['#xv-round-panel','#xv-demographics','#xv-limits','#xv-quotes','#xv-round-panel','#xv-round-panel','#xv-institutions'];
    qa('.lt-finding',page).forEach(function(card,i){
      card.id=card.id || 'finding-'+String(i+1);
      var copy=q('.lt-finding-copy',card);
      if(!copy || q('.ux-evidence-link',copy)) return;
      var actions=document.createElement('div');
      actions.className='ux-inline-actions';
      var b=document.createElement('button');
      b.type='button'; b.className='ux-evidence-link'; b.textContent='See the evidence →';
      b.addEventListener('click',function(){ routeAndScroll('explore',targets[i]||'#xv-round-panel'); });
      var link=document.createElement('button');
      link.type='button'; link.className='ux-copy-link'; link.textContent='Copy link';
      link.addEventListener('click',function(){copyDeepLink({finding:i+1},'tour',link,'Copy link');});
      actions.appendChild(b); actions.appendChild(link); copy.appendChild(actions);
    });

    /* Key findings: compact accordion treatment so each finding has a clear beginning and end. */
    var evidenceCues=[
      '72% support overall across parties',
      '75–81% support across the major protections tested',
      '85% concerned about being forced to deal with AI instead of a person',
      '53–68% upset about institutions using AI for important decisions',
      'Concrete harms ranked above a stand-alone bias frame',
      '80–83% concerned about several high-stakes real-world uses',
      'Top-of-mind AI concerns differ from the harms people react to most strongly'
    ];
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
      toggle.setAttribute('aria-expanded','false');
      toggle.innerHTML='<span>'+label.textContent+'</span><strong>'+title.textContent+'</strong><em>'+(evidenceCues[i]||'')+'</em><i aria-hidden="true">+</i>';

      card.appendChild(toggle);
      card.appendChild(body);
      card.classList.remove('is-open');

      toggle.addEventListener('click',function(){
        var open=!card.classList.contains('is-open');
        card.classList.toggle('is-open',open);
        toggle.setAttribute('aria-expanded',open?'true':'false');
      });
    });

    var linkedFinding=Number(new URLSearchParams(location.search).get('finding'));
    if(linkedFinding>=1 && linkedFinding<=7 && page.dataset.deepLinkHandled!=='1'){
      page.dataset.deepLinkHandled='1';
      setTimeout(function(){
        var skip=q('#headline-skip');
        if(page.hidden && skip) skip.click();
        var card=q('#finding-'+linkedFinding,page);
        var toggle=card&&q('.lt-finding-toggle',card);
        if(card && toggle){
          card.classList.add('is-open');
          toggle.setAttribute('aria-expanded','true');
          setTimeout(function(){scrollToTarget(card);},120);
        }
      },120);
    }
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

    buildSectionNav({
      key:'explore',
      scope:root,
      anchor:hero,
      position:'before',
      aria:'Explore the Data sections',
      sections:[
        ['Rounds','.xv-rounds','ux-explore-rounds'],
        ['Audiences','.xv-demographics','ux-explore-audiences'],
        ['Institutions','.xv-institutions','ux-explore-institutions'],
        ['What people said','.xv-quotes','ux-explore-voices'],
        ['Protections','.xv-limits','ux-explore-protections']
      ]
    });
    return true;
  }

  function refineResources(){
    var root=q('#resources-view.ttj-resources-v2');
    if(!root || root.dataset.uxRefined==='1') return false;
    root.dataset.uxRefined='1';

    var resourceHero=q('.rv-hero',root);
    var resourceDownloads=q('.rv-downloads',root);
    if(resourceHero){
      buildSectionNav({
        key:'resources',
        scope:root,
        anchor:resourceHero,
        position:'before',
        aria:'Use the Research sections',
        sections:[
          ['Message formula','#tool-1','ux-resource-formula'],
          ['Say this / not that','#tool-2','ux-resource-language'],
          ['Talking points','#tool-3','ux-resource-points'],
          ['Sector','#tool-4','ux-resource-sector'],
          ['Strong / weak words','#tool-6','ux-resource-words'],
          ['Checklist','#tool-7','ux-resource-checklist'],
          ['Lead with decision','#tool-8','ux-resource-decision'],
          ['Downloads','.rv-downloads','ux-resource-downloads']
        ]
      });
    }

    var heroInner=q('.rv-hero-inner',root), index=q('.rv-tool-index',root);
    if(heroInner && index && !q('.ux-resource-guide',root)){
      var guide=document.createElement('nav');
      guide.className='ux-resource-guide';
      guide.setAttribute('aria-label','Tools by task');
      guide.innerHTML='<div class="ux-resource-guide-head">'+
          '<span>Tools by task</span>'+
          '<p>Jump directly to the tool you need.</p>'+
        '</div>'+
        '<div class="ux-resource-groups">'+
          '<div class="ux-resource-group"><b>Write</b><div class="ux-resource-guide-buttons">'+
            '<button type="button" data-tool="#tool-1">Build a message</button>'+
            '<button type="button" data-tool="#tool-2">Compare concrete language</button>'+
            '<button type="button" data-tool="#tool-3">Prepare talking points</button>'+
          '</div></div>'+
          '<div class="ux-resource-group"><b>Adapt</b><div class="ux-resource-guide-buttons">'+
            '<button type="button" data-tool="#tool-4">Adapt by sector</button>'+
            '<button type="button" data-tool="#tool-6">Choose stronger language</button>'+
          '</div></div>'+
          '<div class="ux-resource-group"><b>Check</b><div class="ux-resource-guide-buttons">'+
            '<button type="button" data-tool="#tool-7">Check a draft</button>'+
            '<button type="button" data-tool="#tool-8">Lead with the decision</button>'+
          '</div></div>'+
        '</div>';
      var resourceNav=q('.ux-section-nav[data-ux-nav="resources"]',root);
      if(resourceNav) resourceNav.insertAdjacentElement('afterend',guide);
      else if(resourceDownloads) resourceDownloads.insertAdjacentElement('afterend',guide);
      else index.insertAdjacentElement('beforebegin',guide);
      qa('button',guide).forEach(function(btn){
        btn.addEventListener('click',function(){
          var target=q(btn.dataset.tool,root);
          if(!target) return;
          var url=new URL(window.location.href);
          url.searchParams.set('tool',target.id);
          url.hash='resources';
          history.replaceState(null,'',url.toString());
          scrollToTarget(target);
        });
      });
    }

    qa('.rv-tool',root).forEach(function(tool){
      var head=q('.rv-tool-head',tool);
      if(!head || q('.ux-tool-link',head)) return;
      var link=document.createElement('button');
      link.type='button'; link.className='ux-tool-link'; link.textContent='Copy link';
      var heading=q('h2',head);
      link.setAttribute('aria-label','Copy link to '+(heading?heading.textContent:'this tool'));
      link.addEventListener('click',function(){copyDeepLink({tool:tool.id},'resources',link,'Copy link');});
      head.appendChild(link);
    });

    var linkedTool=new URLSearchParams(location.search).get('tool');
    if(linkedTool && root.dataset.deepLinkHandled!=='1'){
      var target=document.getElementById(linkedTool);
      if(target && root.contains(target)){
        root.dataset.deepLinkHandled='1';
        setTimeout(function(){scrollToTarget(target);},180);
      }
    }
    return true;
  }

  function refineSearch(){
    if(q('#ux-site-search')) return true;
    var header=q('.header');
    var nav=q('.nav',header);
    if(!header || !nav || !q('#learn-traditional-page') || !q('#data-view.ttj-explore-v2') || !q('#resources-view.ttj-resources-v2')) return false;

    var trigger=q('.ux-site-search-trigger',header);
    if(!trigger){
      trigger=document.createElement('button');
      trigger.type='button';
      trigger.className='ux-site-search-trigger';
      trigger.innerHTML='<span>Search</span>';
      header.appendChild(trigger);
    }
    trigger.setAttribute('aria-haspopup','dialog');
    trigger.setAttribute('aria-controls','ux-site-search');
    trigger.setAttribute('aria-expanded','false');

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
      item.meta=cleanText(item.meta || item.page);
      item.search=normalise(item.title+' '+item.text+' '+item.meta);
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
          ['A wholly different kind of AI polling','.lt-polling-intro','#ux-home-polling'],
          ['Core finding and recommendation','.lt-core','#ux-home-core'],
          ['What this means','.lt-meaning','#ux-home-meaning'],
          ['Themes','.lt-threads','#ux-home-themes'],
          ['Go deeper','.lt-next','#ux-home-next'],
          ['About the research','.lt-method','#ux-home-method']
        ].forEach(function(row){
          var el=q(row[1],home);
          if(el) addItem('What We Learned','tour',row[0],el.innerText,row[2],{meta:'What We Learned · section'});
        });
        qa('.lt-finding',home).forEach(function(el,i){
          var title=q('h3',el);
          addItem('What We Learned','tour',title ? title.textContent : 'Key finding '+(i+1),el.textContent,ensureId(el,'ux-search-finding',i),{meta:'What We Learned · finding '+(i+1)});
        });
        qa('.lt-thread-list details',home).forEach(function(el,i){
          var title=q('summary',el);
          addItem('What We Learned','tour',title ? title.textContent : 'Theme '+(i+1),el.innerText,'#ux-home-themes');
        });
      }

      var roundEntries=[
        {
          n:1,
          meta:'Mar 6–9, 2026 · N=1,242',
          title:'Round 1 · Main concerns about government use of AI',
          text:'Public services harder to use. One mistake can harm millions. Misleading the public with fake media. No one takes responsibility for harm. Wrongful fraud flags or benefit cuts. Ranked comparison. March 6–9 2026. 1,242 likely voters.'
        },
        {
          n:2,
          meta:'Mar 20–23, 2026 · N=1,193',
          title:'Round 2 · Which broader AI harms feel most serious?',
          text:'Health insurer uses AI to deny doctor-recommended care. Data centers strain water and power. Government outsources programs to tech firms. Benefits housing or jobs cut without accountability. Tracking data without meaningful consent. Bias and discrimination. Ranked comparison. March 20–23 2026. 1,193 likely voters.'
        },
        {
          n:3,
          meta:'Apr 24–27, 2026 · N=1,167',
          title:'Round 3 · Who controls consequential AI decisions?',
          text:'Health insurance companies. Landlords. Private companies running public programs. State government officials. Big Tech companies. Employers. Institutional trust and permission. April 24–27 2026. 1,167 likely voters.'
        },
        {
          n:4,
          meta:'Jul 2–5, 2026 · N=1,164',
          title:'Round 4 · Concrete harms and lived consequences',
          text:'Doctor-recommended treatment denied. Social Security or disability cut off. Benefits fraud. Groceries pricing. Job rejection with no human involved. Workplace monitoring. Forced to deal with AI instead of a person. Medicaid. Eviction surveillance. Housing. July 2–5 2026. 1,164 likely voters.'
        },
        {
          n:5,
          meta:'Jul 24–27, 2026 · N=1,058',
          title:'Round 5 · What rules are people willing to support?',
          text:'Meaningful penalties. Off switches. Safety proof before release. High-stakes bans. Safety proof before use. Community boards with legal authority. Full policy package. July 24–27 2026. 1,058 likely voters.'
        }
      ];
      roundEntries.forEach(function(item){
        addItem('Explore the Data','explore',item.title,item.text,'#ux-explore-rounds',{round:item.n,meta:'Round '+item.n+' · '+item.meta});
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
          if(el) addItem('Explore the Data','explore',row[0],el.innerText,row[2],{meta:'Explore the Data · section'});
        });
      }

      var resources=q('#resources-view.ttj-resources-v2');
      if(resources){
        qa('.rv-tool',resources).forEach(function(el,i){
          if(el.offsetParent===null && !el.closest('#resources-view[hidden]')) return;
          var eyebrow=q('.rv-eyebrow',el);
          var h2=q('h2',el);
          var title=[eyebrow&&eyebrow.textContent,h2&&h2.textContent].filter(Boolean).join(' · ') || 'Resource '+(i+1);
          addItem('Resources','resources',title,el.innerText,'#'+el.id,{meta:'Resources · practical tool'});
        });
        var downloads=q('.rv-downloads',resources);
        if(downloads) addItem('Resources','resources','Downloads and source materials',downloads.innerText,'#ux-resource-downloads',{meta:'Resources · downloads'});
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

    function escapeHtml(value){
      return String(value||'').replace(/[&<>"']/g,function(ch){
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch];
      });
    }
    function highlightMatch(value,query){
      var text=String(value||'');
      var raw=cleanText(query);
      if(!raw) return escapeHtml(text);
      var lower=text.toLowerCase();
      var needle=raw.toLowerCase();
      var at=lower.indexOf(needle);
      if(at<0){
        var first=raw.split(/\s+/).filter(function(x){return x.length>1;})[0]||'';
        needle=first.toLowerCase();
        at=needle ? lower.indexOf(needle) : -1;
      }
      if(at<0) return escapeHtml(text);
      return escapeHtml(text.slice(0,at))+'<mark>'+escapeHtml(text.slice(at,at+needle.length))+'</mark>'+escapeHtml(text.slice(at+needle.length));
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
            '<span class="ux-search-page">'+escapeHtml(item.page)+'</span>'+
            '<strong>'+highlightMatch(item.title,query)+'</strong>'+
            '<span class="ux-search-meta">'+escapeHtml(item.meta)+'</span>'+
            '<span class="ux-search-snippet">'+highlightMatch(snippet(item,query),query)+'</span>'+
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
      trigger.setAttribute('aria-expanded','true');
      document.body.classList.add('ux-search-open');
      var app=q('.app'); if(app && 'inert' in app) app.inert=true;
      input.value='';
      renderResults('');
      setTimeout(function(){input.focus();},30);
    }
    function closeSearch(){
      overlay.hidden=true;
      trigger.setAttribute('aria-expanded','false');
      document.body.classList.remove('ux-search-open');
      var app=q('.app'); if(app && 'inert' in app) app.inert=false;
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
      } else if(e.key==='Tab' && !overlay.hidden){
        var focusable=qa('button:not([disabled]),input:not([disabled]),[href],[tabindex]:not([tabindex="-1"])',overlay).filter(function(el){return el.offsetParent!==null;});
        if(!focusable.length) return;
        var first=focusable[0], last=focusable[focusable.length-1];
        if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
        else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
      }
    });

    return true;
  }

  function addFlowHandoffs(){
    var home=q('#learn-traditional-page'), explore=q('#data-view.ttj-explore-v2'), resources=q('#resources-view.ttj-resources-v2');
    function add(root,anchor,label,title,target,selector,copy){
      if(!root || !anchor || q('.ux-flow-next',root)) return;
      var section=document.createElement('section');
      section.className='ux-flow-next';
      section.innerHTML='<div><span>'+label+'</span><strong>'+title+'</strong><p>'+copy+'</p></div><button type="button">Continue →</button>';
      anchor.insertAdjacentElement('afterend',section);
      q('button',section).addEventListener('click',function(){routeAndScroll(target,selector);});
    }
    if(home) add(home,q('.lt-method',home),'Next','Explore the evidence','explore','#data-view','Move from the headline findings into the five research rounds and detailed results.');
    if(explore) add(explore,q('.xv-source',explore),'Next','Put the research to work','resources','#resources-view','Use the message builder, language examples, sector questions and drafting tools.');
    if(resources) add(resources,q('.rv-tool:last-of-type',resources),'Complete the loop','Return to what we learned','tour','#tour','Go back to the main findings and the story the research tells.');
  }

  function boot(){
    addSkipLink();
    refineHeader();
    refineHome(); refineExplore(); refineResources();
    if(refineHome() || refineExplore() || refineResources()){}
    refineSearch();
    addFlowHandoffs();
  }

  boot();
  var timer=setInterval(boot,100);
  setTimeout(function(){clearInterval(timer);boot();},10000);
})();