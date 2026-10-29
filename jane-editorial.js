/* Jane's copy cleanup: strip periods ending titles, including dynamically rendered headings.
   Keep ordinary paragraph punctuation, abbreviations, and intentional ellipses. */
(() => {
  'use strict';
  const selector='h1,h2,h3,h4,h5,h6';
  /* Editorial Title Case, preserving acronyms, proper names and inline markup. */
  const minorWords=new Set(['a','an','and','as','at','but','by','for','from','in','into','nor','of','on','or','over','per','the','to','via','vs','with','yet']);
  const properWords={
    'ai':'AI','ttj':'TTJ','ppr':'PPR','maxdiff':'MaxDiff','data':'Data',
    'techtonic':'TechTonic','github':'GitHub','vercel':'Vercel'
  };
  function titleWord(original,first,last,afterColon){
    if(!original)return original;
    const lower=original.toLocaleLowerCase('en-US');
    if(properWords[lower])return properWords[lower];
    /* Preserve existing acronyms and intentional mixed-case brand names. */
    if(original.length>1 && (original===original.toLocaleUpperCase('en-US') || /[a-z][A-Z]/.test(original)))return original;
    if(minorWords.has(lower)&&!first&&!last&&!afterColon)return lower;
    return lower.charAt(0).toLocaleUpperCase('en-US')+lower.slice(1);
  }
  function tidy(heading){
    if(heading.closest('[contenteditable="true"]'))return;
    const walker=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walker.nextNode())nodes.push(walker.currentNode);
    if(!nodes.length)return;
    /* Strip trailing full stops without disturbing punctuation inside a title. */
    for(let i=nodes.length-1;i>=0;i--){
      const node=nodes[i],value=node.nodeValue||'';
      if(!value.trim())continue;
      if(/[^.]\.\s*$/.test(value)&&!/\.\.\.\s*$/.test(value)){
        const clean=value.replace(/\.\s*$/,'');
        if(clean!==value)node.nodeValue=clean;
      }
      break;
    }
    const tokens=[];
    const wordPattern=/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu;
    nodes.forEach(node=>{
      const value=node.nodeValue||'';
      for(const match of value.matchAll(wordPattern)){
        tokens.push({node,start:match.index,word:match[0]});
      }
    });
    if(!tokens.length)return;
    const changes=new Map();
    tokens.forEach((token,i)=>{
      const text=token.node.nodeValue||'';
      const before=text.slice(0,token.start);
      const afterColon=i>0 && /:\s*$/.test((tokens[i-1].node===token.node
        ? text.slice(tokens[i-1].start+tokens[i-1].word.length,token.start)
        : (tokens[i-1].node.nodeValue||'').slice(tokens[i-1].start+tokens[i-1].word.length)+before));
      const parts=token.word.split(/([-])/);
      const word=parts.map((part,p)=>part==='-'?part:titleWord(part,i===0 && p===0,i===tokens.length-1 && p===parts.length-1,afterColon)).join('');
      if(word!==token.word){
        if(!changes.has(token.node))changes.set(token.node,[]);
        changes.get(token.node).push({start:token.start,length:token.word.length,value:word});
      }
    });
    changes.forEach((edits,node)=>{
      let value=node.nodeValue||'';
      edits.reverse().forEach(edit=>{value=value.slice(0,edit.start)+edit.value+value.slice(edit.start+edit.length);});
      if(value!==node.nodeValue)node.nodeValue=value;
    });
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
