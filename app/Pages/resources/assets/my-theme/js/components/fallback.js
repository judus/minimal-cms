/**
 * Fallback/Polyfill Scripts
 * adds fallback- and polyfill-scripts if necessary
 */

;(function(window) {
  'use strict';

  // check for jQuery presence
  window.jQuery || document.write('<script src="/assets/pages/public/build/my-theme/vendor/jquery.min.js"><\/script>');

  // check for json support
  Modernizr.json || document.write('<script src="/assets/pages/public/build/my-theme/vendor/json2.js"><\/script>');

  // check for css mediaqueries support
  Modernizr.mediaqueries || document.write('<script src="/assets/pages/public/build/my-theme/vendor/css3-mediaqueries.js"><\/script>');

})(window);
