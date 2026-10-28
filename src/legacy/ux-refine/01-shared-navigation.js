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

