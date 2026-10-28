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

