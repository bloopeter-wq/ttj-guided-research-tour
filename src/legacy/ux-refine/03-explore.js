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

