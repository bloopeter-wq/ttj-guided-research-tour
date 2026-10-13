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

    var targets=['#xv-round-panel','#xv-demographics','#xv-limits','#xv-quotes','#xv-round-panel','#xv-round-panel','#xv-institutions'];
    qa('.lt-finding',page).forEach(function(card,i){
      var copy=q('.lt-finding-copy',card);
      if(!copy || q('.ux-evidence-link',copy)) return;
      var b=document.createElement('button');
      b.type='button'; b.className='ux-evidence-link'; b.textContent='See the evidence →';
      b.addEventListener('click',function(){ routeAndScroll('explore',targets[i]||'#xv-round-panel'); });
      copy.appendChild(b);
    });
    return true;
  }

  function refineExplore(){
    var root=q('#data-view.ttj-explore-v2'), page=root&&q('.xv-page',root), hero=page&&q('.xv-hero',page);
    if(!root || !page || !hero || root.dataset.uxRefined==='1') return false;
    root.dataset.uxRefined='1';

    var sections=[
      ['Rounds','.xv-rounds','ux-explore-rounds'],
      ['Audiences','.xv-demographics','ux-explore-audiences'],
      ['Institutions','.xv-institutions','ux-explore-institutions'],
      ['What people said','.xv-quotes','ux-explore-voices'],
      ['Protections','.xv-limits','ux-explore-protections']
    ];
    sections.forEach(function(item){
      var el=q(item[1],root); if(el) el.id=item[2];
    });

    var nav=document.createElement('nav');
    nav.className='ux-section-nav';
    nav.setAttribute('aria-label','Explore the Data sections');
    nav.innerHTML='<div class="ux-section-nav-inner">'+sections.map(function(item,i){
      return '<button type="button" data-ux-target="'+item[2]+'" class="'+(i===0?'active':'')+'">'+item[0]+'</button>';
    }).join('')+'</div>';
    hero.insertAdjacentElement('afterend',nav);

    qa('button',nav).forEach(function(btn){
      btn.addEventListener('click',function(){ scrollToTarget(document.getElementById(btn.dataset.uxTarget)); });
    });

    if('IntersectionObserver' in window){
      var obs=new IntersectionObserver(function(entries){
        var visible=entries.filter(function(e){return e.isIntersecting;}).sort(function(a,b){return b.intersectionRatio-a.intersectionRatio;})[0];
        if(!visible) return;
        qa('button',nav).forEach(function(b){
          var active=b.dataset.uxTarget===visible.target.id;
          b.classList.toggle('active',active);
          if(active) b.setAttribute('aria-current','true'); else b.removeAttribute('aria-current');
        });
      },{rootMargin:'-18% 0px -64% 0px',threshold:[0,.12,.3,.6]});
      sections.forEach(function(item){ var el=document.getElementById(item[2]); if(el) obs.observe(el); });
    }
    return true;
  }

  function refineResources(){
    var root=q('#resources-view.ttj-resources-v2');
    if(!root || root.dataset.uxRefined==='1') return false;
    root.dataset.uxRefined='1';

    var tool1=q('#tool-1',root), head=tool1&&q('.rv-tool-head>div',tool1);
    if(head && !q('.ux-start-badge',head)){
      var badge=document.createElement('span');
      badge.className='ux-start-badge'; badge.textContent='Start here';
      head.insertBefore(badge,head.firstChild);
    }

    var heroInner=q('.rv-hero-inner',root), index=q('.rv-tool-index',root);
    if(heroInner && index && !q('.ux-resource-guide',root)){
      var guide=document.createElement('div');
      guide.className='ux-resource-guide';
      guide.innerHTML='<span>Choose by task</span><div class="ux-resource-guide-buttons">'+
        '<button type="button" data-tool="#tool-1">Build a message</button>'+
        '<button type="button" data-tool="#tool-2">Compare language</button>'+
        '<button type="button" data-tool="#tool-3">Prepare talking points</button>'+
        '<button type="button" data-tool="#tool-4">Work by sector</button>'+
        '<button type="button" data-tool="#tool-7">Check a draft</button>'+
      '</div>';
      index.insertAdjacentElement('beforebegin',guide);
      qa('button',guide).forEach(function(btn){
        btn.addEventListener('click',function(){ scrollToTarget(q(btn.dataset.tool,root)); });
      });
    }
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
    addOrientation();
  }

  boot();
  var timer=setInterval(boot,100);
  setTimeout(function(){clearInterval(timer);boot();},10000);
})();