(function () {
  'use strict';

  var palette = ['#64C9BB', '#E4B82F', '#EC5E55', '#92B93E'];
  var observer = null;
  var retry = null;

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
    var paths = geometryPaths.map(function (d) {
      return '<path d="' + d + '"/>';
    }).join('');
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">' +
      '<g fill="none" stroke="' + colour + '" stroke-width="7" stroke-linejoin="round" stroke-linecap="round">' +
      paths + '</g></svg>';
    return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
  }

  function applyHeadlineColour() {
    var screen = document.getElementById('learn-headlines');
    var count = document.getElementById('headline-count');
    if (!screen || !count) return false;

    var match = count.textContent.match(/(\d+)/);
    var index = match ? Math.max(0, parseInt(match[1], 10) - 1) : 0;
    var colour = palette[index % palette.length];

    screen.style.setProperty('--headline-color', colour);
    screen.style.setProperty('--headline-geo-image', geometryImage(colour));
    return true;
  }

  function initialise() {
    var count = document.getElementById('headline-count');
    if (!count) return false;

    applyHeadlineColour();
    observer = new MutationObserver(applyHeadlineColour);
    observer.observe(count, { childList: true, characterData: true, subtree: true });
    return true;
  }

  if (!initialise()) {
    retry = setInterval(function () {
      if (initialise()) {
        clearInterval(retry);
        retry = null;
      }
    }, 100);
    setTimeout(function () {
      if (retry) clearInterval(retry);
    }, 10000);
  }
})();

/* Load the isolated Explore the Data V3 enhancement. */
(function(){
  'use strict';
  if(document.querySelector('script[data-explore-v3-loader]')) return;
  var script=document.createElement('script');
  script.src='explore-v3.js?v=20260923-2';
  script.defer=true;
  script.dataset.exploreV3Loader='1';
  document.head.appendChild(script);
})();
