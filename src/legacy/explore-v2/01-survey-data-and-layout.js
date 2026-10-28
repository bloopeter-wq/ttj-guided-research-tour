(() => {
  const ROOT_ID = 'data-view';
  const root = document.getElementById(ROOT_ID);
  if (!root) return;

  const rounds = [
    {
      id: 1,
      date: 'Mar 6–9, 2026',
      n: '1,242',
      metric: 'MaxDiff comparative score',
      rankOnly: true,
      question: 'Which concerns about government use of AI stand out most when compared directly?',
      title: 'Main concerns about government use of AI',
      context: "We wanted to understand which types of harmful AI use concerned people the most when used by the government. So we asked: Some government agencies are using AI systems in their work. Here are some concerns people have raised about this. For each, please pick which you find most concerning and which you find least concerning.",
      explainer: 'Twelve concerns were compared directly using MaxDiff.',
      suggestion: 'Make the abstract concrete and make the invisible harm visible.',
      more: 'When people compared different concerns about government use of AI, the strongest worries were not technical. People were most concerned that public services would become harder to use, that a single mistake could affect millions, and that AI could be used to mislead the public. The messaging lesson is straightforward: start with what changes for the person using the service. An abstract warning about opacity or bias is less immediate than showing someone unable to get help, wrongly losing support, or facing an error nobody will take responsibility for.',
      detail: 'The strongest message was simple: technology gets between people and the public help they need. Scale also matters — one automated error can affect millions.',
      method: 'MaxDiff results are comparative scores, not percentages. Higher values indicate statements chosen as more concerning relative to the other statements tested.',
      bars: [
        ['Public services become harder to use', 6.3, '+6.3'],
        ['One mistake can harm millions', 5.3, '+5.3'],
        ['Misleading the public with fake media', 3.8, '+3.8'],
        ['No one takes responsibility for harm', 2.6, '+2.6'],
        ['Wrongful fraud flags / benefit cuts', 2.1, '+2.1']
      ],
      all: [
              [
                      "When the government uses AI to run public services like Medicaid and Social Security, those services get harder to use. People who need help the most end up with less of it.",
                      "+6.3"
              ],
              [
                      "When the government uses AI to make decisions, one mistake can hurt millions of people at once. A human worker might affect a few hundred people, but AI spreads errors to everyone.",
                      "+5.3"
              ],
              [
                      "AI makes it possible for the government to create fake videos and photos that look real. When officials can fabricate events that never happened, people have no way to know what is true.",
                      "+3.8"
              ],
              [
                      "When government AI makes mistakes that hurt people, no one is held responsible. The people who are harmed are left to deal with the damage on their own.",
                      "+2.6"
              ],
              [
                      "Government AI has a terrible track record. In state after state, AI systems have wrongly accused people of fraud, cut off their benefits, and left them to fight charges that turned out to be wrong.",
                      "+2.1"
              ],
              [
                      "Governments use AI to make decisions based on guesses about how people will act in the future. People can be denied benefits or flagged as risks based on what AI predicts, not what they actually did.",
                      "−0.9"
              ],
              [
                      "When the government uses AI to detect fraud, the system can flag anyone and call it \"fraud,\" even when no one lied. People who made honest mistakes get treated the same as people who cheated.",
                      "−1.7"
              ],
              [
                      "When the government uses AI to decide who gets help, the results look fair and scientific even when they are not. People lose benefits based on formulas they cannot see or challenge.",
                      "−2.5"
              ],
              [
                      "When the government uses AI to make services \"more efficient,\" people end up losing the benefits they depend on. Efficiency often just means fewer people getting help.",
                      "−2.9"
              ],
              [
                      "When the government uses AI to enforce laws, it can choose to go after some people while leaving others alone. AI makes that kind of selective enforcement faster and harder to detect.",
                      "−3.5"
              ],
              [
                      "The government often doesn't have to tell people when AI is making decisions about their lives. People can't fight back against something they don't know is there",
                      "−3.9"
              ],
              [
                      "Every time the government has used AI to run services, those services have gotten worse. People face longer waits, get wrong answers, and have a harder time getting help.",
                      "−4.7"
              ]
      ]
    },
    {
      id: 2,
      date: 'Mar 20–23, 2026',
      n: '1,193',
      metric: 'MaxDiff comparative score',
      rankOnly: true,
      question: 'Which broader harms associated with AI feel most serious when compared directly?',
      title: 'Which broader AI harms feel most serious?',
      context: "We wanted to understand which types of AI harms that were not necessarily just governmental concerned people the most. So we asked: Below are some concerns people have raised about artificial intelligence (AI). For each, please pick which you find most concerning and which you find least concerning.",
      explainer: 'Twelve harms were compared directly using MaxDiff.',
      suggestion: 'The doctor-versus-algorithm conflict is the standout.',
      more: 'One result towers over everything else: an insurer using AI to deny doctor-recommended care. The example combines several features that recur throughout the research: something essential is at stake, a recognizable institution is responsible, a human judgment is being displaced, and the person experiencing the harm has something concrete taken away. It is also notable that data-center pressure on water and electricity came second, showing that the physical and community consequences of AI infrastructure can resonate when described concretely.',
      detail: 'People react most strongly when AI becomes a gatekeeper between a person and something essential. Concrete institutional action is more powerful than abstract warnings about corporate power.',
      method: 'MaxDiff results are comparative scores, not percentages. Higher values indicate statements chosen as more concerning relative to the other statements tested.',
      bars: [
        ['Insurer AI denies doctor-recommended care', 15.7, '+15.7'],
        ['Data centers strain water and power', 5.2, '+5.2'],
        ['Government outsources programs to tech firms', 3.7, '+3.7'],
        ['Benefits / housing / jobs cut, no accountability', 1.3, '+1.3'],
        ['Tracking data without meaningful consent', 0.5, '+0.5']
      ],
      all: [
              [
                      "Health insurance companies are using AI to deny care that doctors say their patients need. Families lose access to treatment not because of medicine but because a company's algorithm said no.",
                      "+15.7"
              ],
              [
                      "Tech companies are building massive data centers that use huge amounts of water and power. These centers drive up electric bills and take drinking water away from the families and farmers who live nearby.",
                      "+5.2"
              ],
              [
                      "Government agencies are handing control of programs like Medicaid and Social Security to tech companies. People who need help end up dealing with corporate chatbots instead of workers who can actually solve their problems.",
                      "+3.7"
              ],
              [
                      "Companies are choosing to deploy AI that cuts people's benefits, housing, and jobs. Current laws were not written for AI, so the people harmed have no clear way to hold anyone accountable.",
                      "+1.3"
              ],
              [
                      "Tech companies and government agencies are using our phones, cars, and home devices to track what we do and collect our personal data. Most of the time, they do this without telling us or asking.",
                      "+0.5"
              ],
              [
                      "Companies are using AI to make major decisions about people's benefits, housing, and jobs. No one in charge can explain how these systems reach their decisions, making them nearly impossible to challenge.",
                      "+0.3"
              ],
              [
                      "A handful of big tech companies control AI and are fighting to avoid oversight. If left unchecked, they will have free rein to shape the decisions that affect our benefits, housing, and jobs.",
                      "+0.2"
              ],
              [
                      "Companies are using AI to monitor workers, control their schedules, and keep wages as low as possible. Workers can be punished or fired based on an algorithm's judgment, with little chance to push back.",
                      "−1.0"
              ],
              [
                      "Tech companies and politicians are building an AI economy designed for people who are already doing well. People who are already struggling will fall further behind as AI reshapes access to benefits, housing, and jobs.",
                      "−1.5"
              ],
              [
                      "When companies use AI to wrongly cut someone's benefits, housing, or job, that person has to spend all their time fighting to get it back. That leaves less time and energy to have a say in their community.",
                      "−2.8"
              ],
              [
                      "Companies are deploying AI trained on biased data, making discrimination against women, people of color, and disabled people worse. They bury the bias in code, making it harder to see and fight.",
                      "−7.7"
              ],
              [
                      "Tech companies take the creative work that people post online and feed it into their AI systems without consent. The people who created those photos, songs, and stories are not asked for permission or offered payment.",
                      "−13.8"
              ]
      ]
    },
    {
      id: 3,
      date: 'Apr 24–27, 2026',
      n: '1,167',
      metric: 'At least somewhat upset · %',
      question: 'How upset would voters be if each institution controlled AI used to make consequential decisions?',
      title: 'Who is choosing to use AI?',
      context: "We wanted to understand how concerned people are about powerful people and institutions using AI to make decisions that affect their lives in critical ways. But we also wanted to determine if the primary driver of their concern came from how they felt about the institution overall or if it was driven by the use of AI and the potential harm it could cause. So first we asked people how favorably they viewed an institution and then we asked how concerned they were about that same institution using AI to make consequential decisions about their lives.",
      explainer: 'Share at least somewhat upset if each actor were in charge of AI used to make consequential decisions.',
      suggestion: 'The issue is consequential decision power.',
      more: 'People are uneasy about giving almost any powerful institution permission to put AI in charge of consequential decisions. Health insurers generated the strongest concern, but landlords, government contractors, state officials, Big Tech companies and others were close behind. Even employers, who were viewed comparatively more favorably, still produced substantial unease. This tells us something important about the “villain” in AI messaging: the institution does not need to be universally hated. A person can trust or even like an organization and still believe it should not have certain automated powers over them.',
      detail: 'Named political figures can produce very intense reactions but also polarise. Everyday gatekeepers create broader shared unease. Employers were generally viewed more favorably, yet 53% were still at least somewhat upset about employer-controlled AI.',
      method: 'The paired chart shows favorability and the share at least somewhat upset about AI decision-making among six institutions. These percentages come from separate questions and must not be subtracted. The list also includes the four public figures and institutions without a paired favorability comparison.',
      bars: [
        ['Health insurance companies', 68, '68%'],
        ['Landlords', 67, '67%'],
        ['Private companies running public programs', 67, '67%'],
        ['State government officials', 66, '66%'],
        ['Big Tech companies', 64, '64%'],
        ['Employer', 53, '53%']
      ],
      all: [
        ['Health insurance companies', '68%'],
        ['Donald Trump', '67%'],
        ['Trump administration officials', '67%'],
        ['ICE', '67%'],
        ['Landlords', '67%'],
        ['Private companies running public programs', '67%'],
        ['State government officials', '66%'],
        ['Elon Musk', '65%'],
        ['Big Tech companies', '64%'],
        ['Employer', '53%']
      ]
    },
    {
      id: 4,
      date: 'Jul 2–5, 2026',
      n: '1,164',
      metric: 'Extremely / very concerned · %',
      question: 'How concerned are voters about specific high-stakes uses of AI in health care, benefits, housing and work?',
      title: 'Which specific uses of AI cross the line?',
      context: "We wanted to understand how concerned people already were about AI before we showed them specific AI harms and we also wanted to know how concerned people are about harms that affect their basic needs like health care, housing, employment, public benefits, education, food assistance, and transportation.",
      explainer: 'People rated fifteen concrete scenarios, then selected the one they most wanted addressed first.',
      suggestion: 'Specific uses reveal a broad boundary.',
      more: 'This round exposes the gap between what people immediately associate with AI and what becomes most concerning once they see what AI can actually be used to do. Without examples, privacy, surveillance, job loss and misinformation came readily to mind. But when people saw specific scenarios, concern was extremely high across health care, disability and Social Security, benefits, workplace monitoring, pricing, housing and being forced to deal with an AI instead of a person. The communications implication is significant: do not assume the most familiar AI issue is the strongest one. Give people concrete examples of automated power in everyday life.',
      detail: '897 people supplied open-ended responses before seeing the scenarios. The most common spontaneous themes were privacy/data/surveillance (20%), job loss/economic harm (16%), and misinformation/deepfakes (10%).',
      method: 'Results show the percentage extremely or very concerned about each specific use. The separate forced-choice priority measure is not shown here.',
      bars: [
        ['Doctor-recommended treatment denied', 73, '73%'],
        ['Social Security / disability cut off', 72, '72%'],
        ['Falsely accused of benefits fraud', 71, '71%'],
        ['Charged more for groceries', 71, '71%'],
        ['Job rejection with no human involved', 70, '70%'],
        ['Forced to deal with AI instead of a person', 69, '69%']
      ],
      all: [
        ['Doctor-recommended treatment denied', '73%'],
        ['Social Security / disability cut off', '72%'],
        ['Falsely accused of benefits fraud', '71%'],
        ['Charged more for groceries', '71%'],
        ['Job rejection with no human involved', '70%'],
        ['Everything at work monitored', '70%'],
        ['Forced to deal with AI instead of a person', '69%'],
        ['Medicaid cut off', '68%'],
        ['Spied on at home to build eviction case', '68%'],
        ['Transplant / pain medicine decision', '68%'],
        ['Rent raised using automated pricing', '67%'],
        ['Benefits repayment demand', '65%'],
        ['Apartment rejected by faulty background check', '65%'],
        ['Child falsely flagged as school threat', '64%'],
        ['Home or car loan denied', '62%']
      ]
    },
    {
      id: 5,
      date: 'Jul 24–27, 2026',
      n: '1,058',
      metric: 'Support · % / reported range',
      question: 'Which concrete protections against harmful uses of AI do voters support?',
      title: 'Support for strong protections against AI harms',
      context: "We wanted to understand what types of interventions and protections against AI harms voters would support. We showed respondents a full policy package of bold protections.",
      explainer: 'Support for strong protections against AI harms. Every major proposal tested at 70% or higher.',
      suggestion: 'Concern has become permission for meaningful intervention.',
      more: 'The final round answers one of the biggest questions raised by the previous research: does concern actually translate into support for action? Every bold protection tested received support of 70 percent or more, including safety proof, off switches, meaningful penalties, community authority and bans on some high-stakes uses. More people worried that regulation would not go far enough than worried about excessive intervention.',
      detail: '72% supported the full package; 32% worried rules would not go far enough; 48% said the maker and user should be equally responsible. Only 4% said neither the vendor nor the organization using the system should be responsible after a harmful hiring error.',
      method: 'Every major bold protection tested received support of 70 percent or more. Ranges preserve split-sample or version differences and should not be treated as single-point estimates.',
      bars: [
        ['Meaningful penalties', 79, '77–81%'],
        ['Off switches', 79.5, '79–80%'],
        ['Safety proof before release', 79.5, '79–80%'],
        ['High-stakes bans', 75, '70–80%'],
        ['Safety proof before use', 77, '77%'],
        ['Community boards with real/legal authority', 74.5, '74–75%']
      ],
      all: [
        ['Meaningful penalties', '77–81%'],
        ['Off switches', '79–80%'],
        ['Safety proof before release', '79–80%'],
        ['High-stakes bans', '70–80%'],
        ['Safety proof before use', '77%'],
        ['Community boards with real/legal authority', '74–75%']
      ]
    }
  ];

  const agePriority = [
    { label: 'Social Security / disability cut off', under45: 11, over45: 35 },
    { label: 'Doctor-recommended treatment denied', under45: 5, over45: 14 },
    { label: 'Eviction surveillance', under45: 10, over45: 4 },
    { label: 'Rent raised by automated pricing', under45: 9, over45: 3 },
    { label: 'Child falsely flagged as school threat', under45: 9, over45: 2 },
    { label: 'False benefits fraud accusation', under45: 8, over45: 6 },
    { label: 'Everything at work monitored', under45: 8, over45: 6 },
    { label: 'Forced to deal with AI instead of a person', under45: 7, over45: 6 },
    { label: 'Medicaid cut off', under45: 6, over45: 6 },
    { label: 'Job rejection with no human involved', under45: 6, over45: 4 }
  ];

  const partyConcern = [
    { label: 'Doctor-recommended treatment denied', dem: 73, ind: 72, rep: 73 },
    { label: 'Social Security / disability cut off', dem: 75, ind: 72, rep: 69 },
    { label: 'False benefits fraud accusation', dem: 72, ind: 72, rep: 69 },
    { label: 'Charged more for groceries', dem: 73, ind: 68, rep: 69 },
    { label: 'Job rejection with no human involved', dem: 75, ind: 63, rep: 68 },
    { label: 'Everything at work monitored', dem: 72, ind: 66, rep: 71 },
    { label: 'Forced AI customer service', dem: 68, ind: 67, rep: 70 },
    { label: 'Medicaid cut off', dem: 74, ind: 64, rep: 62 },
    { label: 'Eviction surveillance', dem: 69, ind: 67, rep: 68 },
    { label: 'Rent raised by automated pricing', dem: 71, ind: 65, rep: 63 }
  ];

  const institutions = [
    { key:'employer', name:'Your employer', fav:75, upset:53, note:'Among employed respondents, 75% viewed their employer favorably. 53% were at least somewhat upset about their employer being in charge of AI used to make consequential decisions.', icon:'briefcase' },
    { key:'tech', name:'Big Tech', fav:57, upset:64, note:'57% viewed Big Tech companies such as Google, Meta and Amazon favorably. 64% were at least somewhat upset about Big Tech controlling consequential AI decisions.', icon:'server' },
    { key:'state', name:'State government', fav:53, upset:66, note:'53% viewed officials in their state government favorably. 66% were at least somewhat upset about state officials controlling consequential AI decisions.', icon:'building' },
    { key:'insurer', name:'Health insurers', fav:47, upset:68, note:'Views of health insurance companies were evenly split at 47% favorable and 47% unfavorable. 68% were at least somewhat upset about insurer-controlled AI decisions.', icon:'health' },
    { key:'landlord', name:'Landlords', fav:40, upset:67, note:'40% viewed landlords favorably. 67% were at least somewhat upset about landlords controlling consequential AI decisions.', icon:'key' },
    { key:'contractor', name:'Public-program contractors', fav:33, upset:67, note:'33% viewed private companies hired by government to run public programs favorably. 67% were at least somewhat upset about these contractors controlling consequential AI decisions.', icon:'network' }
  ];

  const quotes = [
    {theme:'Jobs & economy', text:'Job displacement and online data privacy.'},
    {theme:'Jobs & economy', text:'if it replaces a job someone I know has now'},
    {theme:'Control & autonomy', text:'Skeptical that they will get my personal information and capitalize on it and the mere aspect of their control is terrifying.'},
    {theme:'Security / safety', text:'Controlling the missile system.'},
    {theme:'Privacy & surveillance', text:'The spying that takes place through your phone, and television.'},
    {theme:'Privacy & surveillance', text:'That AI would have my personal information'},
    {theme:'Control & autonomy', text:'The controlling of my finances and personal information'},
    {theme:'Privacy & surveillance', text:'Having my information hacked'},
    {theme:'Human connection', text:'IT IS NOT A HUMAN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'},
    {theme:'Misinformation & deepfakes', text:'I hate all the deepfakes and scams getting way too realistic nowadays'},
    {theme:'Privacy & surveillance', text:'Personal privacy'},
    {theme:'Human connection', text:'Replacing humans'},
    {theme:'Jobs & economy', text:'Losing my job'},
    {theme:'Jobs & economy', text:'AI is untrustworthy and is used to cut jobs while maximize profits for big corporations.'},
    {theme:'Resources & infrastructure', text:'AI taking up energy and water through data centers and causing water shortages and energy price increases. Also AI taking jobs from humans.'},
    {theme:'Privacy & surveillance', text:'Losing privacy'},
    {theme:'Human connection', text:'Mainly AI replacing a human being'},
    {theme:'Misinformation & deepfakes', text:'Getting false information.'},
    {theme:'Misinformation & deepfakes', text:"I'm most concerned about false information and misinformation"},
    {theme:'Privacy & surveillance', text:'Monitoring of phones and viewing habits'},
    {theme:'Jobs & economy', text:'Taking jobs away from education which I work in'},
    {theme:'Misinformation & deepfakes', text:'Fake news and takes jobs'},
    {theme:'Jobs & economy', text:'I do not use AI at all. I feel it will lead to humans losing their jobs to the robots.'},
    {theme:'Jobs & economy', text:"I'm concern that AI will take people's jobs and there are no jobs to replace it."},
    {theme:'Privacy & surveillance', text:'Fear of being taken advantage of or unjustly accused of a crime. Losing our privacy and freedoms due to illegal "spying" of us 24hrs a day.'},
    {theme:'Human connection', text:'Replacing jobs and losing human connection'},
    {theme:'Human connection', text:'Taking away connections between human to human. I fear were moving into isolation because technology has us occupied'},
    {theme:'Human connection', text:'loss of human interaction'},
    {theme:'Control & autonomy', text:'That this technology will eliminate various job sectors and the programs mat develop at such a rate that they are beyond human control.'},
    {theme:'Resources & infrastructure', text:'To monitor, control, or otherwise anything to do with infrastructure. By infrastructure i mean power, water, financial, or oil industry'},
    {theme:'Control & autonomy', text:'I worry that AI is somewhat out of control already and that companies will use it in ways that are detrimental to citizens.'}
  ];

  const safeguards = [
    { name:'Meaningful penalties', value:'77–81%', min:77, copy:'Consequences for companies or institutions when harmful systems break the rules.' },
    { name:'Off switches', value:'79–80%', min:79, copy:'The ability to stop a system when it is causing harm.' },
    { name:'Safety proof before release', value:'79–80%', min:79, copy:'Requiring evidence of safety before a system reaches the public.' },
    { name:'High-stakes bans', value:'70–80%', min:70, copy:'Restrictions on some AI decisions involving health care, housing or work.' },
    { name:'Safety proof before use', value:'77%', min:77, copy:'Requiring organizations to demonstrate safety before deployment.' },
    { name:'Community authority', value:'74–75%', min:74, copy:'Community boards with real or legal authority over high-stakes uses.' }
  ];

