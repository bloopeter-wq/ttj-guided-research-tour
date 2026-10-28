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

