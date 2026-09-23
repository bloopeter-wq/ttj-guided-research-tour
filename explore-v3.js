(function(){
'use strict';

var ROUND_INFO={
1:{explainer:'Twelve concerns about government use of AI were compared directly using MaxDiff. Scores are relative rankings, not percentages.',more:'The strongest tested concern was that AI could make public services such as Medicaid and Social Security harder to use. Concrete, people-centred consequences outperformed more abstract warnings about opacity, objectivity or governance.',points:['Public services becoming harder to use ranked first at +6.3.','One automated mistake harming millions ranked second at +5.3.','The pattern suggests that scale and an identifiable consequence make a concern easier to grasp.']},
2:{explainer:'Respondents compared twelve broader AI harms using MaxDiff, from health care and public outsourcing to data centres, surveillance and discrimination.',more:'One example stood far above the rest: an insurer using AI to deny care recommended by a doctor. It combines an essential need, a recognisable institution, displaced human judgement and a concrete loss.',points:['Doctor-recommended care denied by insurer AI scored +15.7.','Data-centre pressure on water and power came second at +5.2.','Government outsourcing to technology firms followed at +3.7.']},
3:{explainer:'Respondents first rated institutions and actors normally, then said how upset they would be if those actors controlled AI making consequential decisions about their lives.',more:'Ordinary favourability and permission to wield automated decision power are different things. Even institutions viewed comparatively favourably produced substantial unease when AI was placed in charge of consequential decisions.',points:['68% were at least somewhat upset about health insurers controlling consequential AI decisions.','67% said the same about landlords and private companies running public programmes.','Among employed respondents, 53% were at least somewhat upset about employer-controlled AI despite employers being viewed favourably overall.']},
4:{explainer:'Respondents rated fifteen concrete uses of AI, then made a forced choice about the one they most wanted addressed first. This round also included the only open-ended write-in question.',more:'Round 4 separates top-of-mind AI anxiety from concern about concrete institutional uses. Privacy, surveillance, jobs and misinformation came to mind first; once specific uses were shown, high concern extended across health care, benefits, work, housing, pricing and access to a human being.',points:['73% were extremely or very concerned about doctor-recommended treatment being denied.','Social Security or disability cuts were the top forced-choice priority at 27%.','897 people gave open-ended answers before seeing the concrete scenarios.']},
5:{explainer:'Six three-word accountability phrases were compared directly using MaxDiff to test the language people found most compelling.',more:'Prevent, Protect, Repair won decisively. Each verb carries a distinct responsibility: prevent harm before it happens, protect people while systems are being used, and repair harm when prevention fails.',points:['Prevent, Protect, Repair scored +24.7.','The next phrase, Stop, Protect, Repair, scored +7.1.','The leading phrase performed strongly among Democrats, Independents and Republicans in this survey.']},
6:{explainer:'Respondents considered concrete guardrails for high-stakes AI, including safety proof, off switches, penalties, community authority and restrictions on some uses.',more:'The final round tested whether concern translates into support for action. Every major safeguard tested received at least 70% support, and the full package received 72% support.',points:['Off switches and safety proof before release were supported by roughly four in five respondents.','High-stakes restrictions on AI decisions affecting health care, housing or work received 70–80% support across split samples.','Only 4% said neither the vendor nor the organisation using a system should be responsible after a harmful hiring error.']}
};

var AGE_DATA=[
 {label:'Social Security / disability cut off',young:11,older:35},
 {label:'Home surveillance to build an eviction case',young:10,older:4},
 {label:'Automated rent pricing',young:9,older:3},
 {label:'Child falsely flagged as a school threat',young:9,older:2},
 {label:'Benefits fraud accusation',young:8,older:6},
 {label:'Workplace monitoring',young:8,older:6}
];

var PARTY_DATA=[
 {label:'Prevent, Protect, Repair',metric:'MaxDiff · Round 5',dem:26.2,ind:26.6,rep:21.9,suffix:''},
 {label:'Full policy package',metric:'Support · Round 6',dem:69,ind:73,rep:73,suffix:'%'},
 {label:'Community boards with legal authority',metric:'Support · Round 6',dem:79,ind:81,rep:67,suffix:'%'},
 {label:'Ban AI from denying health care, housing or work',metric:'Support · Round 6',dem:71,ind:76,rep:64,suffix:'%'}
];

var INSTITUTIONS=[
 {name:'Employer',fav:75,upset:53,scope:'Employed respondents · n=590',icon:'briefcase',copy:'High ordinary favourability did not translate into blanket permission for employer-controlled AI.'},
 {name:'Big Tech',fav:57,upset:64,scope:'Likely voters · Round 3',icon:'chip',copy:'A majority viewed major technology companies favourably, while an even larger share was uneasy about their AI decision power.'},
 {name:'State government',fav:53,upset:66,scope:'Likely voters · Round 3',icon:'building',copy:'Views of state government were net favourable overall, yet two-thirds were at least somewhat upset about state officials controlling consequential AI decisions.'},
 {name:'Health insurers',fav:47,upset:68,scope:'Likely voters · Round 3',icon:'cross',copy:'Health insurers generated the highest broad unease among the everyday institutional gatekeepers tested.'},
 {name:'Landlords',fav:40,upset:67,scope:'Likely voters · Round 3',icon:'home',copy:'Only four in ten rated landlords favourably, while two-thirds were uneasy about landlord-controlled consequential AI.'},
 {name:'Public contractors',fav:33,upset:67,scope:'Private companies running public programmes · Round 3',icon:'network',copy:'Private contractors were viewed less favourably, and concern about handing them automated decision power was widespread.'}
];

var WRITEINS=[
 {theme:'Privacy, data & surveillance',share:'20%',tags:'privacy data surveillance tracking monitoring',text:'The largest coded group of substantive open-ended answers mentioned privacy, data or surveillance.'},
 {theme:'Jobs & economic harm',share:'16%',tags:'jobs work unemployment economy wages economic',text:'Job loss and wider economic harm formed the second-largest coded theme in the open-ended responses.'},
 {theme:'Misinformation & deepfakes',share:'10%',tags:'misinformation deepfakes fake media truth information',text:'Misinformation and deepfakes were another prominent spontaneous association with AI.'},
 {theme:'Benefits & essential services',share:'Round 4',tags:'benefits social security medicaid services welfare disability',text:'Once concrete examples were shown, benefits and essential public services became highly salient.'},
 {theme:'Health care & human judgement',share:'73%',tags:'health healthcare doctor insurer care treatment medicine',text:'73% were extremely or very concerned about AI denying treatment recommended by a doctor.'},
 {theme:'Housing & pricing',share:'67–68%',tags:'housing rent landlord eviction pricing apartment',text:'Concrete housing scenarios included automated rent pricing and home surveillance used to build an eviction case.'},
 {theme:'Human access & recourse',share:'69%',tags:'human person recourse customer service appeal',text:'69% were extremely or very concerned about being forced to deal with AI instead of a person for customer service.'},
 {theme:'Accountability',share:'77–81%',tags:'accountability responsibility penalties liability responsible',text:'Later testing found strong support for meaningful penalties and clear responsibility when automated systems cause harm.'}
];

function iconSVG(type){
 var common='viewBox="0 0 120 120" aria-hidden="true"';
 var paths={
  briefcase:'<rect x="20" y="39" width="80" height="52" rx="5"/><path d="M45 39V27h30v12M20 58h80M52 57v10h16V57"/>',
  chip:'<rect x="31" y="31" width="58" height="58" rx="8"/><rect x="45" y="45" width="30" height="30" rx="3"/><path d="M42 18v13M60 18v13M78 18v13M42 89v13M60 89v13M78 89v13M18 42h13M18 60h13M18 78h13M89 42h13M89 60h13M89 78h13"/>',
  building:'<path d="M18 96h84M27 90V46h66v44M20 46h80L60 19 20 46Z"/><path d="M39 56v25M53 56v25M67 56v25M81 56v25"/>',
  cross:'<path d="M49 20h22v29h29v22H71v29H49V71H20V49h29V20Z"/>',
  home:'<path d="M18 59 60 24l42 35M29 53v44h62V53M50 97V69h20v28"/>',
  network:'<circle cx="60" cy="28" r="12"/><circle cx="31" cy="80" r="12"/><circle cx="89" cy="80" r="12"/><path d="m53 38-15 31M67 38l15 31M43 80h34"/>'
 };
 return '<svg '+common+'>'+paths[type]+'</svg>';
}

function el(tag,cls,html){var n=document.createElement(tag);if(cls)n.className=cls;if(html!==undefined)n.innerHTML=html;return n;}

function animateNumber(node,target,duration,format){
 var start=null;
 function tick(ts){if(!start)start=ts;var p=Math.min(1,(ts-start)/duration);var eased=1-Math.pow(1-p,3);var val=Math.round(target*eased);node.textContent=format?format(val):val.toLocaleString('en-US');if(p<1)requestAnimationFrame(tick);}
 requestAnimationFrame(tick);
}

function enhanceRounds(root){
 root.querySelectorAll('.round').forEach(function(round){
  var id=parseInt(round.getAttribute('data-round'),10),info=ROUND_INFO[id];if(!info||round.dataset.v3==='1')return;round.dataset.v3='1';
  var title=round.querySelector('h2'),bars=round.querySelector('.evidence-rows'),interpretation=round.querySelector('.interpretation'),method=round.querySelector('.method-note');
  var explain=el('p','round-explainer',info.explainer);title.insertAdjacentElement('afterend',explain);
  if(interpretation){
   var txt=interpretation.textContent.replace(/^What this suggests\.\s*/i,'');
   interpretation.className='interpretation round-takeaway';interpretation.innerHTML='<span>What this suggests</span><strong>'+txt+'</strong>';
   bars.parentNode.insertBefore(interpretation,bars);
  }
  var details=el('details','round-more');
  var list=info.points.map(function(p){return '<li>'+p+'</li>';}).join('');
  details.innerHTML='<summary><span>More about this round</span><b aria-hidden="true">+</b></summary><div class="round-more-inner"><div><div class="detail-label">What the round tells us</div><p>'+info.more+'</p></div><div><div class="detail-label">What stood out</div><ul>'+list+'</ul></div></div>';
  if(method){var m=el('p','round-method','<strong>How to read it.</strong> '+method.textContent);details.querySelector('.round-more-inner').appendChild(m);method.remove();}
  bars.insertAdjacentElement('afterend',details);
 });
}

function buildSnapshot(root){
 var heading=root.querySelector('.section-heading');if(!heading||root.querySelector('.research-snapshot'))return;
 var snap=el('section','research-snapshot','<div class="snapshot-intro"><span>Research at a glance</span><b>March → July 2026</b></div><div class="snapshot-stat"><strong data-target="7043">0</strong><span>likely voters interviewed across the programme</span></div><div class="snapshot-stat"><strong data-target="6">0</strong><span>rounds of message and policy testing</span></div><div class="snapshot-line"><i></i><i></i><i></i><i></i><i></i><i></i></div>');
 heading.insertAdjacentElement('afterend',snap);
 var fired=false,run=function(){if(fired)return;fired=true;animateNumber(snap.querySelector('[data-target="7043"]'),7043,950);animateNumber(snap.querySelector('[data-target="6"]'),6,650);};
 if('IntersectionObserver'in window){new IntersectionObserver(function(es,o){if(es[0].isIntersecting){run();o.disconnect();}},{threshold:.25}).observe(snap);}else run();
}

function ageRows(mode){
 return AGE_DATA.map(function(d){
  if(mode==='compare')return '<div class="aud-row"><div><strong>'+d.label+'</strong><small>Top forced-choice concern · Round 4</small></div><div class="aud-bars"><span class="young" style="--w:'+d.young+'%"><i></i><b>Under 45&nbsp; '+d.young+'%</b></span><span class="older" style="--w:'+d.older+'%"><i></i><b>45+&nbsp; '+d.older+'%</b></span></div></div>';
  var value=mode==='young'?d.young:d.older,label=mode==='young'?'Under 45':'45+';
  return '<div class="aud-row single"><div><strong>'+d.label+'</strong><small>Top forced-choice concern · Round 4</small></div><div class="aud-bars"><span class="'+mode+'" style="--w:'+value+'%"><i></i><b>'+label+'&nbsp; '+value+'%</b></span></div></div>';
 }).join('');
}
function partyRows(mode){
 function val(d,k){var v=d[k];return (v>0&&d.metric.indexOf('MaxDiff')===0?'+':'')+v+d.suffix;}
 return PARTY_DATA.map(function(d){
  if(mode==='compare')return '<div class="party-card"><div><strong>'+d.label+'</strong><small>'+d.metric+'</small></div><div class="party-values"><span><b>'+val(d,'dem')+'</b><i>Dem.</i></span><span><b>'+val(d,'ind')+'</b><i>Ind.</i></span><span><b>'+val(d,'rep')+'</b><i>Rep.</i></span></div></div>';
  var names={dem:'Democrat',ind:'Independent',rep:'Republican'};
  return '<div class="party-card single"><div><strong>'+d.label+'</strong><small>'+d.metric+'</small></div><div class="party-values"><span><b>'+val(d,mode)+'</b><i>'+names[mode]+'</i></span></div></div>';
 }).join('');
}
function buildAudience(){
 var sec=el('section','data-feature audience-explorer','<div class="feature-head"><div><span class="feature-kicker">Compare audiences</span><h2>One public. Different emphases.</h2></div><p>Switch between age and party affiliation to see where the same research moves — and where it holds.</p></div><div class="aud-mode" role="group"><button class="active" data-aud="age">Age</button><button data-aud="party">Party affiliation</button></div><div class="aud-subtabs"></div><div class="aud-display"></div><p class="aud-note"></p>');
 var mode='age',sub='compare',subs=sec.querySelector('.aud-subtabs'),display=sec.querySelector('.aud-display'),note=sec.querySelector('.aud-note');
 function render(){
  if(mode==='age'){
   subs.innerHTML='<button data-sub="compare">Compare both</button><button data-sub="young">Under 45</button><button data-sub="older">45+</button>';
   display.innerHTML=ageRows(sub);note.textContent='Round 4 forced-choice question: respondents selected the single AI use they most wanted addressed first. Values shown are percentages within each age group.';
  }else{
   subs.innerHTML='<button data-sub="compare">Compare all</button><button data-sub="dem">Democrat</button><button data-sub="ind">Independent</button><button data-sub="rep">Republican</button>';
   if(!['compare','dem','ind','rep'].includes(sub))sub='compare';display.innerHTML=partyRows(sub);note.textContent='These rows come from different questions and metrics. Compare groups within a row; do not compare the numeric size of a MaxDiff score with a support percentage.';
  }
  Array.from(subs.children).forEach(function(b){b.classList.toggle('active',b.dataset.sub===sub);b.onclick=function(){sub=b.dataset.sub;render();};});
 }
 sec.querySelectorAll('[data-aud]').forEach(function(b){b.onclick=function(){mode=b.dataset.aud;sub='compare';sec.querySelectorAll('[data-aud]').forEach(function(x){x.classList.toggle('active',x===b);});render();};});render();return sec;
}

function buildInstitutions(){
 var cards=INSTITUTIONS.map(function(d,i){return '<article class="institution-card" data-inst="'+i+'"><button class="institution-face" aria-expanded="false"><span class="institution-art">'+iconSVG(d.icon)+'</span><span class="institution-name">'+d.name+'</span><span class="institution-open">Explore <b>+</b></span></button><div class="institution-detail"><p>'+d.copy+'</p><div class="institution-measures"><div><span>Favourable view</span><strong>'+d.fav+'%</strong><i style="--w:'+d.fav+'%"></i></div><div><span>Upset about AI decision power</span><strong>'+d.upset+'%</strong><i style="--w:'+d.upset+'%"></i></div></div><small>'+d.scope+'</small></div></article>';}).join('');
 var sec=el('section','data-feature institutions-feature','<div class="feature-head light"><div><span class="feature-kicker">Trust is not permission</span><h2>A person may like an institution.<br><em>That does not mean they want its AI deciding their life.</em></h2></div><p>Open an institution to compare ordinary favourability with discomfort about giving it consequential automated power.</p></div><div class="institution-grid">'+cards+'</div><p class="institution-note">Round 3, April 24–27, 2026. “Upset” here means at least somewhat upset. Employer favourability and AI-power results use employed respondents (n=590); other institutions use the broader likely-voter sample.</p>');
 sec.querySelectorAll('.institution-face').forEach(function(btn){btn.onclick=function(){var card=btn.closest('.institution-card'),open=!card.classList.contains('open');sec.querySelectorAll('.institution-card.open').forEach(function(c){c.classList.remove('open');c.querySelector('button').setAttribute('aria-expanded','false');});if(open){card.classList.add('open');btn.setAttribute('aria-expanded','true');}};});return sec;
}

function buildWriteins(){
 var sec=el('section','data-feature writein-feature','<div class="feature-head"><div><span class="feature-kicker">Open-ended research</span><h2>What people mentioned first.</h2></div><p>Search the coded themes from Round 4’s 897 open-ended responses before respondents saw the concrete scenarios.</p></div><div class="writein-search"><span aria-hidden="true">⌕</span><input type="search" placeholder="Search privacy, jobs, housing, health care…" aria-label="Search write-in themes"><button type="button">Surprise me</button></div><div class="writein-grid"></div><p class="writein-note"><strong>About this bank.</strong> The published source available here reports coded themes and aggregate findings, not individual verbatim responses. These cards therefore do not invent quotations; they show the themes and tested evidence behind them.</p>');
 var grid=sec.querySelector('.writein-grid'),input=sec.querySelector('input');
 function render(q){q=(q||'').toLowerCase().trim();var arr=WRITEINS.filter(function(d){return !q||(d.theme+' '+d.tags+' '+d.text).toLowerCase().indexOf(q)>-1;});grid.innerHTML=arr.length?arr.map(function(d){return '<article><span>'+d.share+'</span><h3>'+d.theme+'</h3><p>'+d.text+'</p></article>';}).join(''):'<div class="no-writeins">No matching theme. Try a broader term.</div>';}
 input.addEventListener('input',function(){render(input.value);});sec.querySelector('.writein-search button').onclick=function(){var d=WRITEINS[Math.floor(Math.random()*WRITEINS.length)];input.value=d.theme.split(' ')[0];render(input.value);};render('');return sec;
}

function buildLimits(){
 var items=[['Safety proof before release','79–80%'],['Off switches','79–80%'],['Meaningful penalties','77–81%'],['Safety proof before use','77%'],['High-stakes restrictions','70–80%'],['Community boards with legal authority','74–75%']];
 var rails=items.map(function(d,i){return '<button class="guardrail" style="--delay:'+(i*.07)+'s"><span>'+d[0]+'</span><strong>'+d[1]+'</strong><i>View finding</i></button>';}).join('');
 var sec=el('section','limits-feature','<div class="limits-geometry"></div><div class="limits-copy"><span class="feature-kicker">Round 6 · Public protection</span><h2>Voters supported stronger limits on high-stakes AI.</h2><p>Every major safeguard tested received support from at least seven in ten respondents.</p><div class="limits-topline"><strong>72%</strong><span>supported the full policy package</span></div></div><div class="guardrails">'+rails+'</div><div class="limit-detail" aria-live="polite"><span>Select a safeguard</span><p>Explore the individual measures tested in the final round.</p></div>');
 var detail=sec.querySelector('.limit-detail');sec.querySelectorAll('.guardrail').forEach(function(b){b.onclick=function(){sec.querySelectorAll('.guardrail').forEach(function(x){x.classList.toggle('active',x===b);});var name=b.querySelector('span').textContent,val=b.querySelector('strong').textContent;var copy={
  'Safety proof before release':'Respondents supported requiring companies to prove high-stakes systems are safe before they are released.',
  'Off switches':'Respondents supported requiring a way to stop high-stakes systems when they are causing harm.',
  'Meaningful penalties':'Large majorities supported meaningful penalties when companies or institutions violate the rules.',
  'Safety proof before use':'Respondents also supported a burden of proof before institutions put systems into use.',
  'High-stakes restrictions':'Restrictions on AI decisions that deny health care, housing or work were tested across split samples.',
  'Community boards with legal authority':'Respondents supported community boards with legal authority to investigate AI systems and act on problems they find.'
 }[name];detail.innerHTML='<span>'+val+' support</span><p>'+copy+'</p>';};});return sec;
}

function buildFeatures(root){
 if(root.querySelector('.audience-explorer'))return;
 var source=root.querySelector('.source-note'),cross=root.querySelector('.cross-theme');if(!source)return;
 var marker=cross||source.nextSibling;
 [buildAudience(),buildInstitutions(),buildWriteins(),buildLimits()].forEach(function(s){root.insertBefore(s,marker);});
 if(cross){cross.querySelector('.eyebrow').textContent='Continue exploring';cross.querySelectorAll('button').forEach(function(b){b.textContent=b.textContent.replace('→','');});}
}

function loadCSS(){if(document.querySelector('link[data-explore-v3]'))return;var l=document.createElement('link');l.rel='stylesheet';l.href='explore-v3.css?v=20260923-2';l.dataset.exploreV3='1';document.head.appendChild(l);}
function init(){var root=document.getElementById('data-view');if(!root||root.dataset.exploreV3==='1')return false;root.dataset.exploreV3='1';root.classList.add('explore-v3');loadCSS();buildSnapshot(root);enhanceRounds(root);buildFeatures(root);return true;}
if(!init()){var t=setInterval(function(){if(init())clearInterval(t);},100);setTimeout(function(){clearInterval(t);},10000);}
})();