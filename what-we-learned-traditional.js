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
      <section class="lt-hero">
        <div class="lt-geo" aria-hidden="true"></div>
        <div class="lt-shell lt-hero-grid">
          <div>
            <div class="lt-kicker">What we learned</div>
            <h1>It’s not <span>(just)</span><br>about AI.</h1>
            <p class="lt-lede">Across five rounds of research, the same pattern kept appearing: people respond most strongly to what automated systems <em>do</em> to them, who chose to use them, and who is responsible when something goes wrong.</p>
            <div class="lt-actions">
              <a href="#explore" data-lt-section="explore">Explore the full data →</a>
              <button type="button" id="lt-replay">Replay the opening</button>
            </div>
          </div>
          <aside class="lt-hero-note">
            <div class="lt-mini">The throughline</div>
            <p><b>Power.</b><br><b>Consequences.</b><br><b>Responsibility.</b></p>
            <span>Those themes repeatedly mattered more than abstract technology language.</span>
          </aside>
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

      <section class="lt-core">
        <div class="lt-geo" aria-hidden="true"></div>
        <div class="lt-shell lt-core-grid">
          <div class="lt-kicker">The central finding</div>
          <div>
            <h2>Voters are concerned with the concrete harms AI enables when individuals or institutions use automated systems to wield power over an important part of someone’s life.</h2>
            <p><strong>Make the abstract concrete and make the invisible harm visible.</strong> Be specific and human: show where AI is being used, who chose to use it, and what someone may lose due to it.</p>
          </div>
        </div>
        <div class="lt-shell lt-pillars">
          <article><b>01</b><h3>Make the abstract concrete</h3><p>Talk about the everyday harm: what someone could lose, be denied, pay more for, or be unable to challenge.</p></article>
          <article><b>02</b><h3>Make invisible harm visible</h3><p>Show where automated systems are already being used to make consequential decisions about people’s lives.</p></article>
          <article><b>03</b><h3>Be specific and human</h3><p>Name who chose to use the system, what decision was made, and what the person may lose because of it.</p></article>
        </div>
      </section>

      <section class="lt-findings">
        <div class="lt-shell">
          <div class="lt-section-top"><div><div class="lt-kicker">Key findings</div><h2>Seven things the research tells us.</h2></div><p>Scroll through the evidence. The page is designed to read like a report, not a presentation.</p></div>

          <article class="lt-finding lt-feature">
            <div class="lt-finding-copy"><span>01 / Concrete harm</span><h3>It’s not really about AI. It’s about power over people’s lives.</h3><p>Voters are concerned with the concrete harms AI enables when individuals or institutions use automated systems to wield power over an important part of someone’s life, especially the ability to get, keep, or afford health care, public benefits, housing, or a job.</p></div>
            <div class="lt-evidence-bars">
              <div><span>Doctor-recommended treatment denied</span><b>73%</b><i style="--w:73%"></i></div>
              <div><span>Social Security / disability cut off</span><b>72%</b><i style="--w:72%"></i></div>
              <div><span>Job rejection with no human involved</span><b>70%</b><i style="--w:70%"></i></div>
              <div><span>Forced to deal with AI instead of a person</span><b>69%</b><i style="--w:69%"></i></div>
            </div>
          </article>

          <article class="lt-finding">
            <div class="lt-finding-copy"><span>02 / Cross-partisan agreement</span><h3>This is one of the only places that parties agree.</h3><p>A full package of strong policy protections drew support across voters, including majorities of Democrats, independents, and Republicans. Protecting people from AI harms does not require picking a partisan side to be effective.</p></div>
            <div class="lt-number-cluster"><div><strong>69%</strong><span>Democrats</span></div><div><strong>73%</strong><span>Independents</span></div><div><strong>73%</strong><span>Republicans</span></div></div>
          </article>

          <article class="lt-finding lt-dark">
            <div class="lt-finding-copy"><span>03 / Stronger limits</span><h3>Voters support bans and more.</h3><p>Every major protection tested received support from at least seven in ten respondents, including bans, off switches, proof of safety before use, meaningful penalties, and community oversight boards with legal authority. We should not assume only voluntary or incremental measures will be publicly acceptable.</p></div>
            <div class="lt-evidence-bars light">
              <div><span>Off switches</span><b>79–80%</b><i style="--w:80%"></i></div>
              <div><span>Proof of safety before release</span><b>79–80%</b><i style="--w:80%"></i></div>
              <div><span>Meaningful penalties</span><b>77–81%</b><i style="--w:81%"></i></div>
              <div><span>High-stakes bans</span><b>70–80%</b><i style="--w:80%"></i></div>
            </div>
          </article>

          <article class="lt-finding">
            <div class="lt-finding-copy"><span>04 / Awareness gap</span><h3>Voters may not be aware of the harms that concern them most.</h3><p>Asked openly, many respondents defaulted to concerns they already had names for, including privacy and surveillance, job loss, and misinformation or deepfakes. Once shown concrete examples of AI affecting health care, benefits, employment, and housing, concern broadened sharply. Raising awareness of these less visible harms will be key.</p></div>
            <div class="lt-number-callout"><strong>62–73%</strong><span>extremely or very concerned across fifteen concrete high-stakes scenarios once real examples were shown</span></div>
          </article>

          <article class="lt-finding">
            <div class="lt-finding-copy"><span>05 / Human recourse</span><h3>People still want to reach people.</h3><p>People want to be able to reach someone who can listen, explain, exercise judgment, take responsibility, and change an outcome in the way only a fellow human being can.</p></div>
            <div class="lt-number-callout"><strong>69%</strong><span>extremely or very concerned about being forced to deal with AI instead of a person</span></div>
          </article>

          <article class="lt-finding">
            <div class="lt-finding-copy"><span>06 / Framing nuance</span><h3>A caution about bias and discrimination.</h3><p>An argument about bias and discrimination was less concerning than most of the other harms tested. That does not mean people should avoid talking about bias and discrimination. Concrete harms, such as health companies using AI to deny care, may resonate more strongly while still making visible the racial, gender, and disability biases layered into those harms.</p></div>
            <div class="lt-compare"><div><strong>+15.7</strong><span>Insurer uses AI to deny doctor-recommended care</span></div><div><strong>−7.7</strong><span>“Bias and discrimination” as a stand-alone frame</span></div></div>
          </article>

          <article class="lt-finding lt-feature">
            <div class="lt-finding-copy"><span>07 / Institutions</span><h3>Liking an institution does not necessarily mean trusting its use of AI.</h3><p>General favourability is not necessarily associated with decreased anger about AI use. Naming the institution responsible for a decision does not require attacking it: the focus can stay on the choice to use automated decision-making in a particular context.</p></div>
            <div class="lt-evidence-bars">
              <div><span>Health insurers</span><b>68%</b><i style="--w:68%"></i></div>
              <div><span>Landlords</span><b>67%</b><i style="--w:67%"></i></div>
              <div><span>Private companies running public programs</span><b>67%</b><i style="--w:67%"></i></div>
              <div><span>State government officials</span><b>66%</b><i style="--w:66%"></i></div>
              <div><span>Big Tech companies</span><b>64%</b><i style="--w:64%"></i></div>
              <div><span>Employer</span><b>53%</b><i style="--w:53%"></i></div>
            </div>
          </article>
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
          <div><div class="lt-kicker">About the research</div><h2>Five rounds. Different questions. One recurring pattern.</h2></div>
          <div><p>TechTonic Justice and Data for Progress conducted five rounds of message testing with 5,824 likely voters between March and July 2026. Different rounds used different methods, including MaxDiff and percentage-based concern or support measures.</p><p>MaxDiff scores are relative preference scores, not percentages. Percentages and ranges should be read under the question wording and sample used in the relevant round.</p><a href="#explore" data-lt-section="explore">See methodology and round details →</a></div>
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

    document.getElementById('lt-replay').addEventListener('click', function () {
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
