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