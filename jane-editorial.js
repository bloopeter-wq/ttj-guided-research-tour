/* Jane's copy cleanup: strip periods ending titles, including dynamically rendered headings.
   Keep ordinary paragraph punctuation, abbreviations, and intentional ellipses. */
(() => {
  'use strict';
  const selector='h1,h2,h3,h4,h5,h6';
  function tidy(heading){
    if(heading.closest('[contenteditable="true"]'))return;
    const walker=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walker.nextNode())nodes.push(walker.currentNode);
    for(let i=nodes.length-1;i>=0;i--){
      const node=nodes[i],value=node.nodeValue||'';
      if(!value.trim())continue;
      if(/[^.]\.\s*$/.test(value)&&!/\.\.\.\s*$/.test(value))node.nodeValue=value.replace(/\.\s*$/,'');
      break;
    }
  }
  function scan(root){
    if(root.nodeType===1&&root.matches(selector))tidy(root);
    if(root.querySelectorAll)root.querySelectorAll(selector).forEach(tidy);
  }
  scan(document);
  /* The homepage hero headline is dynamically rendered inside a non-heading node. */
  function tidyHero(){
    const hero=document.querySelector('#tour #hb2-hero #hb2-text');
    if(!hero)return;
    const walker=document.createTreeWalker(hero,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walker.nextNode())nodes.push(walker.currentNode);
    for(let i=nodes.length-1;i>=0;i--){
      const node=nodes[i],value=node.nodeValue||'';
      if(!value.trim())continue;
      if(/[^.]\.\s*$/.test(value))node.nodeValue=value.replace(/\.\s*$/,'');
      break;
    }
  }
  tidyHero();
  new MutationObserver(records=>{
    for(const rec of records){
      tidyHero();
      if(rec.type==='characterData'){
        const h=rec.target.parentElement?.closest(selector);
        if(h)tidy(h);
      }else rec.addedNodes.forEach(node=>{
        if(node.nodeType===1)scan(node);
        else if(node.nodeType===3){
          const h=node.parentElement?.closest(selector);
          if(h)tidy(h);
        }
      });
    }
  }).observe(document.documentElement,{subtree:true,childList:true,characterData:true});
})();
