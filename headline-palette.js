(function () {
  'use strict';

  var palette = ['#64C9BB', '#E4B82F', '#EC5E55', '#92B93E'];
  var observer = null;
  var retry = null;

  function applyHeadlineColour() {
    var screen = document.getElementById('learn-headlines');
    var count = document.getElementById('headline-count');
    if (!screen || !count) return false;

    var match = count.textContent.match(/(\d+)/);
    var index = match ? Math.max(0, parseInt(match[1], 10) - 1) : 0;
    screen.style.setProperty('--headline-color', palette[index % palette.length]);
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
