(function () {
  'use strict';

  /* Jane's approved single headline, formerly the first slide. */
  var headline = 'Don’t Stop At Weak Guardrails: Voters Across Parties Want <span class="hb2-emphasis">Strong AI Protections</span>';

  /* Preserve the original headline palette: jade → gold → coral → lime. */
  var colour = '#047E72';
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
        '<div class="hb2-main" id="hb2-main"><h1 id="hb2-text"></h1></div>' +
        '<div class="hb2-bottom" aria-hidden="true"></div>' +
      '</div>';
    tour.insertBefore(hero, page);

    /* Static hero: no timers, navigation arrows, slide changes or swipe handlers. */
    hero.style.setProperty('--hb2-color', colour);
    hero.style.setProperty('--hb2-geo-image', geometryImage(colour));
    var title = document.getElementById('hb2-text');
    if (title) {
      title.className = 'hb2-slide hb2-slide-0';
      title.innerHTML = headline;
    }

    return true;
  }

  if (!init()) {
    var poll = setInterval(function () {
      if (init()) clearInterval(poll);
    }, 60);
    setTimeout(function () { clearInterval(poll); }, 10000);
  }
})();
