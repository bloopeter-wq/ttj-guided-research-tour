(function () {
  'use strict';

  function init() {
    var tour = document.getElementById('tour');
    var headlines = document.getElementById('learn-headlines');
    var findingsScreen = document.getElementById('learn-findings');
    var threadsScreen = document.getElementById('learn-threads');
    if (!tour || !headlines || !findingsScreen) return false;
    if (document.getElementById('learn-traditional-page')) return true;

    var page = document.createElement('section');
    page.id = 'learn-traditional-page';
    page.className = 'learn-traditional-page';
    page.hidden = true;
    page.innerHTML = `
      <div class="ux-report-transition"><span>What the research found</span></div>
      <section class="lt-hero lt-memo-intro">
        <div class="lt-shell">
          <div class="lt-kicker">You should know</div>
          <div class="lt-memo-intro-grid">
            <div>
              <h1>AI is already making decisions about our lives.</h1>
              <p class="lt-lede">People often think of “AI” in terms of chatbots, deepfakes, killer robots and possible job loss. What is less well known is how much AI has already infiltrated major decisions being made about our lives right now.</p>
            </div>
            <div class="lt-memo-examples" aria-label="Examples of decisions already affected by AI">
              <p>Whether a health insurer approves a life-saving medical treatment.</p>
              <p>Whether a Social Security case gets falsely flagged as fraud.</p>
              <p>Whether a landlord raises the rent.</p>
            </div>
          </div>
          <div class="lt-memo-now"><strong>These are not future risks.</strong><p>Powerful people are already using these technologies to make decisions, mostly invisibly, about people who have no idea automated systems were involved.</p></div>
        </div>
      </section>

      <section class="lt-snapshot">
        <div class="lt-shell">
          <div class="lt-section-top"><div class="lt-kicker">Research at a glance</div><p>Five rounds of TechTonic Justice + Data for Progress message testing.</p></div>
          <div class="lt-stat-grid">
            <article><strong>5,824</strong><span>likely voters interviewed</span></article>
            <article><strong>5</strong><span>rounds of research</span></article>
            <article><strong>Mar–Jul</strong><span>2026 fieldwork</span></article>
          </div>
        </div>
      </section>

      <section class="lt-difference">
        <div class="lt-shell lt-difference-grid">
          <div>
            <div class="lt-kicker">What made this testing different</div>
            <h2>We tested real-world uses of AI, the harms those systems cause, and specific policies to address those harms.</h2>
          </div>
          <div>
            <p>Most polling on AI asks people how they feel about AI as a whole and whether they want it regulated. That helps explain general attitudes. This polling was more specific.</p>
            <p>Knowing how people react to real-world uses, ground-level harms and concrete protections gives a better picture of how to build public support for proposals that prevent, protect against and repair harm.</p>
          </div>
        </div>
      </section>

      <section class="lt-core">
        <div class="lt-shell lt-core-grid">
          <div class="lt-kicker">The Core Finding and Recommendation</div>
          <div>
            <h2>Voters are concerned with the concrete harms AI enables when individuals or institutions use automated systems to wield power over an important part of someone’s life.</h2>
            <p>More abstract concerns were consistently less compelling than tangible harms to the ability to get, keep or afford health care, public benefits such as Social Security, housing or a job.</p>
          </div>
        </div>
        <div class="lt-shell lt-recommendation">
          <span>Recommendation</span>
          <div>
            <h3>Make the abstract concrete and make the invisible harm visible.</h3>
            <p>People do not necessarily think about health care, benefits and housing when they think about harmful AI. They may not even know automated systems are making these decisions. Show where AI is being used, who chose to use it and what someone may lose because of it. Be specific and human.</p>
          </div>
        </div>
      </section>

      <section class="lt-findings">
        <div class="lt-shell">
          <div class="lt-section-top lt-findings-head"><div><div class="lt-kicker">More Findings</div><h2>What the research found.</h2></div></div>

          <article class="lt-finding">
            <div class="lt-finding-copy"><span>01 / Cross-partisan agreement</span><h3>This Is One of the Only Places that Parties Agree</h3><p>A full package of strong policy protections, including bans, off switches, proof of safety before use, penalties for harm and community oversight boards with legal authority, drew 72% support across all voters. Protecting people from AI harms does not require picking a partisan side to be effective.</p></div>
            <div class="lt-package-support"><strong>72%</strong><span>support overall</span><p>69% Democrats · 73% Independents · 73% Republicans</p></div>
          </article>

          <article class="lt-finding">
            <div class="lt-finding-copy"><span>02 / Strong protections</span><h3>Voters Support Bans and More</h3><p>While bans registered as the highest priority of the individual protections tested, voters strongly supported every major protection. We should not assume only voluntary or incremental measures will be publicly acceptable.</p></div>
            <div class="lt-evidence-bars">
              <div><span>Meaningful penalties for harmful AI</span><b>81%</b><i style="--w:81%"></i></div>
              <div><span>Immediate off switches</span><b>80%</b><i style="--w:80%"></i></div>
              <div><span>Proof of harmlessness before release</span><b>80%</b><i style="--w:80%"></i></div>
              <div><span>Bans on high-stakes uses affecting health, housing or work</span><b>80%</b><i style="--w:80%"></i></div>
              <div><span>Community oversight boards with legal authority</span><b>75%</b><i style="--w:75%"></i></div>
            </div>
          </article>

          <article class="lt-finding">
            <div class="lt-finding-copy"><span>03 / Human recourse</span><h3>People Still Want to Reach People</h3><p>People want to be able to reach someone who can listen, explain, exercise judgment, take responsibility and change an outcome in the way only a fellow human being can.</p></div>
            <div class="lt-number-callout"><strong>85%</strong><span>were extremely, very or somewhat concerned about being forced to deal with AI instead of a person for customer service</span></div>
          </article>

          <article class="lt-finding">
            <div class="lt-finding-copy"><span>04 / Institutions</span><h3>Liking an Institution Does Not Necessarily Mean Trusting Its Use of AI</h3><p>General favorability is not necessarily associated with decreased anger about AI use. Naming the institution responsible for a decision does not require attacking it. The focus can stay on the choice to use automated decision-making in a particular context.</p></div>
            <div class="lt-evidence-bars">
              <div><span>Health insurers</span><b>68%</b><i style="--w:68%"></i></div>
              <div><span>Landlords</span><b>67%</b><i style="--w:67%"></i></div>
              <div><span>Private companies running public programs</span><b>67%</b><i style="--w:67%"></i></div>
              <div><span>State government officials</span><b>66%</b><i style="--w:66%"></i></div>
              <div><span>Big Tech companies</span><b>64%</b><i style="--w:64%"></i></div>
              <div><span>Employer</span><b>53%</b><i style="--w:53%"></i></div>
            </div>
          </article>

          <article class="lt-finding">
            <div class="lt-finding-copy"><span>05 / Bias and discrimination</span><h3>A Caution about Bias and Discrimination</h3><p>When ranked against other arguments about AI harms, a stand-alone argument about bias and discrimination was less concerning than most of the alternatives tested. That does not mean people should avoid talking about bias and discrimination. Concrete harms may resonate more strongly while still making visible the racial, gender and disability biases layered into those harms.</p></div>
            <div class="lt-editorial-note"><b>Messaging implication</b><p>Lead with the concrete harm and incorporate an anti-bias or anti-discrimination lens where it is relevant to that harm.</p></div>
          </article>

          <article class="lt-finding">
            <div class="lt-finding-copy"><span>06 / Real-world uses</span><h3>Voters are concerned by real-world uses of AI that make decisions about their health, benefits and employment.</h3><p>When people were shown specific examples of AI being used to make critical decisions, concern was consistently high.</p></div>
            <div class="lt-evidence-bars">
              <div><span>Doctor-recommended treatment denied</span><b>83%</b><i style="--w:83%"></i></div>
              <div><span>Social Security or disability benefits cut off</span><b>83%</b><i style="--w:83%"></i></div>
              <div><span>Job rejection with no human involved</span><b>81%</b><i style="--w:81%"></i></div>
              <div><span>Everything at work monitored</span><b>81%</b><i style="--w:81%"></i></div>
              <div><span>Falsely accused of benefits fraud</span><b>80%</b><i style="--w:80%"></i></div>
            </div>
          </article>

          <article class="lt-finding">
            <div class="lt-finding-copy"><span>07 / Awareness gap</span><h3>Voters may not be aware of the harms that concern them most.</h3><p>Asked openly what uses of AI concerned them, many respondents defaulted to concerns they already had names for, such as privacy and surveillance, job loss, misinformation or deepfakes. Those top-of-mind concerns can change when people are shown other harms, including medical care being denied, benefits being cut off, job rejections with no human involved and workplace monitoring.</p></div>
            <div class="lt-editorial-note"><b>Awareness gap</b><p>Raising awareness of these ongoing, ground-level harms is a key opportunity for public communication and organizing.</p></div>
          </article>
        </div>
      </section>

      <section class="lt-meaning">
        <div class="lt-shell lt-meaning-grid">
          <div><div class="lt-kicker">What This Means</div><h2>Invisible Harm and Opportunity</h2></div>
          <div>
            <p>Voters are deeply concerned by ongoing AI uses that hurt health care, work, housing and benefits, and they support bold policy proposals to stop those harms. Raising awareness should therefore be a priority.</p>
            <p>That can mean talking with the communities you belong to or serve, sharing stories of injustice, amplifying similar stories from elsewhere, and directly taking on fights to resist harmful uses of AI where you have the capacity to do so.</p>
          </div>
        </div>
      </section>

      <section class="lt-threads">
        <div class="lt-shell">
          <div class="lt-section-top"><div><div class="lt-kicker">Explore the themes</div><h2>Five threads running through five rounds.</h2></div><p>These are the recurring ideas that connect the individual findings.</p></div>
          <div class="lt-thread-list">
            <details open><summary><span>01</span>Power & control</summary><p>It's not really about AI. It's about who has power over people's lives, and whether they have any say in decisions that affect them.</p></details>
            <details><summary><span>02</span>Concrete harm</summary><p>Specific, tangible harms move people more than abstract warnings about AI in general. “Your insurer used AI to deny the treatment your doctor says you need” beats “AI can produce bias in health care” every time it was tested.</p></details>
            <details><summary><span>03</span>Institutional accountability</summary><p>The strongest messages name the institution, the action it took, and what a person lost. “AI” should not become a grammatical trick that makes human decisions sound like nobody made them.</p></details>
            <details><summary><span>04</span>Prevention & protection</summary><p>Voters support strong protections against harmful uses of AI, including bans on the highest-stakes uses, proof of safety before use, off switches, meaningful penalties, and community oversight with legal authority.</p></details>
            <details><summary><span>05</span>Red lines & safeguards</summary><p>Support for AI safety goes well beyond transparency. Large majorities back safety-proofing, off switches, penalties, and outright bans on the highest-stakes uses.</p></details>
          </div>
        </div>
      </section>

      <section class="lt-next">
        <div class="lt-geo" aria-hidden="true"></div>
        <div class="lt-shell">
          <div class="lt-kicker">Go deeper</div>
          <h2>Read the evidence.<br>Then put it to work.</h2>
          <div class="lt-route-grid">
            <a href="#explore" data-lt-section="explore"><span>01 / Evidence</span><h3>Explore the Data</h3><p>Move through all five rounds, compare age and party groups, inspect institutions, and search the open-ended evidence.</p><b>Explore the full data →</b></a>
            <a href="#resources" data-lt-section="resources"><span>02 / Practical use</span><h3>Use the Resources</h3><p>Build messages, compare stronger and weaker formulations, use sector aids, and work through the drafting checklist.</p><b>Open the toolkit →</b></a>
          </div>
        </div>
      </section>

      <section class="lt-method">
        <div class="lt-shell lt-method-grid">
          <div><div class="lt-kicker">About the research</div></div>
          <div><p>TechTonic Justice and Data for Progress conducted five rounds of message testing with 5,824 likely voters between March and July 2026. The first two rounds used comparative ranking; later rounds report percentages for concern or support.</p><p>Comparative rounds are shown in ranked order without their underlying score values. Percentages and ranges should be read under the question wording and sample used in the relevant round.</p><a href="#explore" data-lt-section="explore">See methodology and round details →</a></div>
        </div>
      </section>
    `;

    tour.appendChild(page);

    var showingStatic = false;
    function showTraditional() {
      if (showingStatic) return;
      showingStatic = true;
      var headlineTimerEls = document.querySelectorAll('#learn-headlines, #learn-findings, #learn-threads');
      headlineTimerEls.forEach(function (el) { el.hidden = true; });
      page.hidden = false;
      tour.classList.add('traditional-mode');
      document.body.classList.add('learn-traditional-open');
      window.scrollTo(0, 0);
    }

    var skip = document.getElementById('headline-skip');
    if (skip) {
      skip.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        showTraditional();
      }, true);
    }

    var observer = new MutationObserver(function () {
      if (!findingsScreen.hidden && !showingStatic) showTraditional();
    });
    observer.observe(findingsScreen, { attributes: true, attributeFilter: ['hidden'] });

    var replayButton = document.getElementById('lt-replay');
    if (replayButton) replayButton.addEventListener('click', function () {
      showingStatic = false;
      page.hidden = true;
      tour.classList.remove('traditional-mode');
      document.body.classList.remove('learn-traditional-open');
      var replay = document.getElementById('finding-replay');
      if (replay) replay.click();
      else {
        headlines.hidden = false;
        window.scrollTo(0, 0);
      }
    });

    page.querySelectorAll('[data-lt-section]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        var section = link.getAttribute('data-lt-section');
        history.pushState(null, '', '#' + section);
        try {
          if (typeof navigate === 'function') navigate(section);
          else location.hash = section;
        } catch (e) {
          location.hash = section;
        }
      });
    });

    return true;
  }

  if (!init()) {
    var timer = setInterval(function () { if (init()) clearInterval(timer); }, 60);
    setTimeout(function () { clearInterval(timer); }, 10000);
  }
})();
