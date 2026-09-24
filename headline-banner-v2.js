(function () {
  'use strict';

  var headlines = [
    'New Research: More Than 70% of Voters, Including Majorities of Republicans, Want Real Limits on AI Decision-Making',
    "Voters aren't asking for AI guardrails. They're asking for limits.",
    'Corporations and agencies are letting AI decide who gets care, and voters want it stopped',
    'AI is becoming a political issue, and this election is just the start.'
  ];

  /* Preserve the original headline palette: jade → gold → coral → lime. */
  var palette = ['#64C9BB', '#E4B82F', '#EC5E55', '#92B93E'];
  var geometryPaths = [
    'M85 -90 L430 125 L190 415 L-45 220 Z',
    'M430 125 L645 48 L875 175 L685 470 L190 415 Z',
    'M875 175 L1115 62 L1395 215 L1260 505 L685 470 Z',
    'M1395 215 L1650 85 L1650 410 L1260 505 Z',
    'M-45 220 L190 415 L165 650 L-60 755 Z',
    'M190 415 L685 470 L640 735 L165 650 Z',
    'M685 470 L1260 505 L1090 790 L640 735 Z',
    'M1260 505 L1650 410 L1640 720 L1090 790 Z',
    'M165 650 L640 735 L790 970 L285 970 Z',
    'M640 735 L1090 790 L1220 970 L790 970 Z',
    'M1090 790 L1640 720 L1670 970 L1220 970 Z'
  ];

  function geometryImage(colour) {
    var paths = geometryPaths.map(function (d) { return '<path d="' + d + '"/>'; }).join('');
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">' +
      '<g fill="none" stroke="' + colour + '" stroke-width="7" stroke-linejoin="round" stroke-linecap="round">' + paths + '</g></svg>';
    return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
  }

  function init() {
    var tour = document.getElementById('tour');
    var page = document.getElementById('learn-traditional-page');
    if (!tour || !page) return false;
    if (document.getElementById('hb2-hero')) return true;

    document.querySelectorAll('#learn-headlines,#learn-findings,#learn-threads').forEach(function (el) { el.hidden = true; });
    page.hidden = false;
    tour.classList.add('traditional-mode','headline-banner-mode');
    document.body.classList.add('learn-traditional-open');

    var hero = document.createElement('section');
    hero.id = 'hb2-hero';
    hero.className = 'hb2-hero';
    hero.innerHTML = '<div class="hb2-geo" aria-hidden="true"></div>' +
      '<div class="hb2-shell">' +
        '<div class="hb2-top"><div class="hb2-kicker">Headlines from the research</div><div class="hb2-count" id="hb2-count">01 / 04</div></div>' +
        '<div class="hb2-main" id="hb2-main"><h1 id="hb2-text"></h1></div>' +
        '<div class="hb2-bottom"><div class="hb2-track" id="hb2-track"></div><button class="hb2-scroll" id="hb2-scroll" type="button">Explore the findings ↓</button></div>' +
      '</div>';
    tour.insertBefore(hero, page);

    var index = 0;
    var timer = null;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function render() {
      var main = document.getElementById('hb2-main');
      var text = document.getElementById('hb2-text');
      var count = document.getElementById('hb2-count');
      var track = document.getElementById('hb2-track');
      if (!main || !text || !count || !track) return;

      var colour = palette[index % palette.length];
      hero.style.setProperty('--hb2-color', colour);
      hero.style.setProperty('--hb2-geo-image', geometryImage(colour));

      main.classList.remove('enter');
      void main.offsetWidth;
      text.textContent = headlines[index];
      main.classList.add('enter');
      count.textContent = String(index + 1).padStart(2,'0') + ' / ' + String(headlines.length).padStart(2,'0');
      track.innerHTML = headlines.map(function (_, i) {
        return '<span class="' + (i < index ? 'done' : (i === index ? 'active' : '')) + '"></span>';
      }).join('');
    }

    function schedule() {
      clearTimeout(timer);
      if (reduced) return;
      timer = setTimeout(function () {
        if (!tour.hidden) {
          index = (index + 1) % headlines.length;
          render();
        }
        schedule();
      }, 6000);
    }

    render();
    schedule();

    document.getElementById('hb2-scroll').addEventListener('click', function () {
      var target = page.querySelector('.lt-snapshot') || page;
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    });

    window.addEventListener('hashchange', function () {
      if (location.hash === '#tour' || !location.hash) schedule();
    });

    return true;
  }

  if (!init()) {
    var poll = setInterval(function () {
      if (init()) clearInterval(poll);
    }, 60);
    setTimeout(function () { clearInterval(poll); }, 10000);
  }
})();
