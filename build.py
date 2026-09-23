from pathlib import Path
import html, re

root=Path(__file__).parent
source=(root/'approved-prototype.html').read_text()
rounds=[
 ('Main concerns about government use of AI','Mar 6–9, 2026','1,242','MaxDiff','Public services harder to use|6.3;One mistake harms millions|5.3;Misleading the public with fake media|3.8;No one takes responsibility for harm|2.6;Wrongful fraud flags or benefit cuts|2.1','Concrete consequences and service failures outranked abstract technical warnings.'),
 ('Which broader AI harms feel most serious?','Mar 20–23, 2026','1,193','MaxDiff','Insurer AI denies doctor-recommended care|15.7;Data centres strain water and power|5.2;Government outsources programs to tech firms|3.7;Benefits, housing or jobs cut without accountability|1.3;Tracking data without meaningful consent|0.5','The insurer denying doctor-recommended care was the standout relative concern.'),
 ('Who controls consequential AI decisions?','Apr 24–27, 2026','1,167','At least somewhat upset · %','Health insurance companies|68;Landlords|67;Private companies running public programs|67;State government officials|66;Big Tech companies|64;Employer|53','Even comparatively trusted institutions drew unease when placed in charge of consequential decisions.'),
 ('Concrete harms and lived consequences','Jul 2–5, 2026','1,164','Extremely or very concerned · %','Doctor-recommended treatment denied|73;Social Security or disability cut off|72;Falsely accused of benefits fraud|71;Charged more for groceries|71;Job rejection with no human involved|70;Forced to deal with AI instead of a person|69','Specific losses in care, benefits, prices and human recourse generated high concern. The separate forced-choice priority is a different measure.'),
 ('Which three-word response feels right?','Jul 10–13, 2026','1,219','MaxDiff','Prevent, Protect, Repair|24.7;Stop, Protect, Repair|7.1;Prevent, Stop, Fix|2.7;Stop, Protect, Fix|-4.3;Prevent, Stop, Treat|-7.5;Prevent, Mitigate, Repair|-22.6','Prevent, Protect, Repair led the comparative language test across partisan groups.'),
 ('What rules are people willing to support?','Jul 24–27, 2026','1,058','Support · % or reported range','Meaningful penalties|77–81;Off switches|79–80;Safety proof before release|79–80;High-stakes bans|70–80;Safety proof before use|77;Community boards with legal authority|74–75','The full policy package had 72% support. Ranges reflect versions or split samples and should not be treated as single estimates.')
]
data=[]
for i,(title,date,n,metric,items,interpretation) in enumerate(rounds,1):
    bars=[]
    for item in items.split(';'):
        label,value=item.rsplit('|',1)
        v=float(re.search(r'-?\d+(?:\.\d+)?',value).group())
        width=max(3,min(100,(v+25)*2 if metric=='MaxDiff' else v))
        bars.append(f'<div class="evidence-row"><div class="evidence-label"><span>{html.escape(label)}</span><b>{"+" if metric=="MaxDiff" and v>0 else ""}{value}{"" if metric=="MaxDiff" else "%"}</b></div><div class="evidence-track"><span style="width:{width}%"></span></div></div>')
    data.append(f'<article class="round" id="round-{i}" data-round="{i}"><div class="round-top"><div class="eyebrow">Research round {i:02d} / 06</div><div class="round-nav"><button type="button" data-go="{i-1}" {"disabled" if i==1 else ""}>← Previous</button><button type="button" data-go="{i+1}" {"disabled" if i==6 else ""}>Next →</button></div></div><h2>{html.escape(title)}</h2><div class="round-meta"><span>{date}</span><span>N={n} likely voters</span><span>{html.escape(metric)}</span></div><p class="tested">Tested: {html.escape(title.lower())}</p><div class="evidence-rows">{"".join(bars)}</div><p class="interpretation"><strong>What this suggests.</strong> {html.escape(interpretation)}</p><p class="method-note">{("MaxDiff is a relative preference NET score, not a percentage. Positive and negative values reflect comparison within this round." if metric=='MaxDiff' else "Percentages are shares of respondents under the question wording shown. Ranges preserve the source's split-sample or version variation.")}</p></article>')

files=[
 ('Research','Message Testing Cheat Sheet','TTJ_Message Testing Cheat Sheet_PB - Revised_September 2026.pdf','A seven-page guide to all six rounds and how to read the measures.'),
 ('Movement organisations','Movement pamphlet','TTJ_Message_Testing_Pamphlet_V1_Movement_Organisations_Copy_Draft_Google_Docs_Ready.docx','Draft copy for campaign and movement messaging.'),
 ('Movement organisations','Movement one-page cheat sheet','TTJ_Message_Testing_One_Page_Cheat_Sheet_Movement_Organisations_Copy_Full_Page.docx','A concise writing reference for organisers.'),
 ('Policymakers / legislative staff','Policymaker message-testing pamphlet','TTJ_Message_Testing_Pamphlet_V2_Policymakers_Copy_Draft.docx','Draft copy for policy audiences.'),
 ('Policymakers / legislative staff','Policymaker one-page cheat sheet','TTJ_Message_Testing_One_Page_Cheat_Sheet_Policymakers_Copy_Full_Page.docx','A compact evidence and language reference.'),
 ('Policymakers / legislative staff','PPR policy framework pamphlet','TTJ_Policy_Framework_Pamphlet_Policymakers_Google_Docs_Fully_Editable_FINAL.docx','Editable framework document for policy use.'),
 ('Across audiences','Prevent, Protect, Repair one-sheet','TTJ_Policy_Framework_One_Sheet_Google_Docs_Editable_v2.docx','An editable overview of the framework.'),
 ('Sector guidance','Sector one-page cheat sheet','TTJ_One_Page_Sector_Cheat_Sheet_Copy_Clean_Full_Page_FINAL.docx','Sector-specific messaging copy.')
]
sections=[]
for category in dict.fromkeys(f[0] for f in files):
    rows=[]
    for cat,title,filename,description in files:
        if cat!=category:continue
        url='resources/'+html.escape(filename,quote=True).replace(' ','%20')
        rows.append(f'<a class="resource-row" href="{url}" download><span><strong>{html.escape(title)}</strong><small>{html.escape(description)}</small></span><span class="download">Download ↗</span></a>')
    sections.append(f'<div class="resource-group"><h2>{html.escape(category)}</h2>{"".join(rows)}</div>')

extra='''<section class="section-view" id="data-view" hidden><div class="section-heading"><div class="eyebrow">02 / Evidence</div><h1>Explore the data<span>.</span></h1><p>Six rounds of TechTonic Justice + Data for Progress research. Move through what was tested, what respondents said, and how to read each result.</p></div><div class="round-tabs" role="group" aria-label="Research rounds">'''+''.join(f'<button type="button" data-go="{i}">Round {i:02d}</button>' for i in range(1,7))+'''</div>'''+''.join(data)+'''<div class="cross-theme"><div class="eyebrow">Across the evidence</div><h2>Follow the themes.</h2><div class="theme-links"><button data-go="2">Concrete harm ↗</button><button data-go="3">Institutional power ↗</button><button data-go="4">Human recourse ↗</button><button data-go="5">PPR language ↗</button><button data-go="6">Public protection ↗</button></div><p>These links take you to the rounds where each theme was tested. The source does not provide comparable audience splits for every measure, so this view does not manufacture an audience filter.</p></div><p class="source-note">Source: TTJ Message Testing Cheat Sheet, September 2026. Rounds 1, 2 and 5 report relative MaxDiff scores; other rounds report percentages. Question wording, samples and methods vary across rounds.</p></section><section class="section-view" id="resources-view" hidden><div class="section-heading"><div class="eyebrow">03 / Practical use</div><h1>Put the research to work<span>.</span></h1><p>Start with the evidence, then choose language and policy materials for your audience. These are the actual available TTJ documents.</p></div><div class="resource-list">'''+''.join(sections)+'''</div><div class="practice"><div class="eyebrow">A working principle</div><h2>Person. Institution. Action. Consequence.</h2><p>Show who was affected, who used the system, what they did, and what was lost. Then explain what prevention, protection and repair require.</p></div></section>'''
source=source.replace('  <footer class="footer">',extra+'  <footer class="footer">',1)
source=source.replace('id="explore"','data-section="explore"').replace('id="resources"','data-section="resources"')
style='''<style>
[hidden]{display:none!important}body.section-open{overflow:auto}body.section-open .app{height:auto;min-height:100vh;grid-template-rows:88px auto 72px}.section-view{min-height:calc(100vh - 120px);background:#f6f5f0;color:#111426;padding:8vh max(5vw,24px) 12vh}.section-heading{max-width:1000px;margin:0 auto 50px}.section-heading h1{font-size:clamp(3.5rem,9vw,9rem);line-height:.92;letter-spacing:-.065em;margin:28px 0}.section-heading h1 span{color:#047e72}.section-heading p{max-width:680px;font-size:clamp(1.1rem,2vw,1.5rem);line-height:1.45}.round-tabs{display:flex;gap:8px;overflow:auto;max-width:1100px;margin:0 auto 36px;padding-bottom:8px}.round-tabs button,.round-nav button,.theme-links button{cursor:pointer;border:1px solid #a6aaa8;background:transparent;padding:12px 18px;font:inherit;color:inherit;white-space:nowrap}.round-tabs button.active,.round-tabs button:hover,.round-nav button:hover:not(:disabled),.theme-links button:hover{background:#047e72;color:white;border-color:#047e72}.round-nav button:disabled{opacity:.3;cursor:default}.round{display:none;max-width:1100px;margin:auto;border-top:5px solid #047e72;padding:26px 0 50px}.round.active{display:block}.round-top,.round-meta,.evidence-label,.resource-row{display:flex;justify-content:space-between;gap:18px}.round-top{align-items:center}.round-nav{display:flex;gap:8px}.round h2{font-size:clamp(2.4rem,5.5vw,5rem);line-height:1;letter-spacing:-.04em;max-width:850px;margin:40px 0}.round-meta{flex-wrap:wrap;border-top:1px solid #bbb;border-bottom:1px solid #bbb;padding:18px 0;text-transform:uppercase;font-size:.85rem;letter-spacing:.1em}.tested{font-size:1.15rem;margin:28px 0}.evidence-rows{max-width:860px}.evidence-row{padding:13px 0}.evidence-label{font-size:1rem;line-height:1.3}.evidence-label b{white-space:nowrap}.evidence-track{height:7px;background:#e3e3df;margin-top:9px}.evidence-track span{display:block;height:100%;background:#047e72}.interpretation{font-size:1.4rem;max-width:770px;line-height:1.4;border-left:4px solid #e4b82f;padding-left:24px;margin:48px 0 24px}.method-note,.source-note,.cross-theme p{color:#4d5057;line-height:1.5;max-width:800px}.cross-theme,.source-note{max-width:1100px;margin:60px auto}.cross-theme{border-top:1px solid #aaa;padding-top:40px}.cross-theme h2,.practice h2{font-size:clamp(2rem,5vw,4rem);letter-spacing:-.04em}.theme-links{display:flex;gap:8px;flex-wrap:wrap}.resource-list{max-width:1100px;margin:auto}.resource-group{margin:55px 0}.resource-group h2{font-size:clamp(1.7rem,3vw,3rem);letter-spacing:-.03em}.resource-row{align-items:center;padding:24px 0;border-top:1px solid #aeb1ac;text-decoration:none;color:inherit}.resource-row:last-child{border-bottom:1px solid #aeb1ac}.resource-row:hover{color:#047e72}.resource-row strong,.resource-row small{display:block}.resource-row strong{font-size:1.25rem}.resource-row small{margin-top:7px;color:#52575b;line-height:1.4}.download{white-space:nowrap}.practice{max-width:1100px;margin:80px auto 0;background:#082421;color:white;padding:clamp(25px,5vw,70px)}.practice p{max-width:700px;line-height:1.5;font-size:1.2rem}.nav a.active{color:#047e72}@media(max-width:650px){.section-view{padding-top:55px}.round-top{align-items:flex-start;flex-direction:column}.round-nav button{padding:10px}.resource-row{align-items:flex-start}.download{font-size:.8rem}.round-meta{gap:10px}.section-heading{margin-bottom:30px}}
</style>'''
source=source.replace('</head>',style+'</head>')
source=source.replace('render(true);','''
let activeSection='tour';
function navigate(section){
  if(!['tour','explore','resources'].includes(section))section='tour';
  activeSection=section;
  document.body.classList.toggle('section-open',section!=='tour');
  $('tour').hidden=section!=='tour';
  $('data-view').hidden=section!=='explore';
  $('resources-view').hidden=section!=='resources';
  document.querySelectorAll('.nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+section));
  if(section!=='tour')clearTimeout(timer);else if(!$('completion').classList.contains('show'))schedule();
  window.scrollTo(0,0);
}
function roundTo(n){if(n<1||n>6)return;document.querySelectorAll('.round').forEach(el=>el.classList.toggle('active',Number(el.dataset.round)===n));document.querySelectorAll('.round-tabs button').forEach(el=>el.classList.toggle('active',Number(el.dataset.go)===n));}
document.querySelectorAll('[data-go]').forEach(button=>button.addEventListener('click',()=>roundTo(Number(button.dataset.go))));
window.addEventListener('hashchange',()=>navigate(location.hash.slice(1)));
roundTo(1);render(true);navigate(location.hash.slice(1)||'tour');''')
(root/'index.html').write_text(source)
