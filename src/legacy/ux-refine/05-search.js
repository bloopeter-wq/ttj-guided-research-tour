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

