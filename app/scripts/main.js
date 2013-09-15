require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        three: '../bower_components/threejs/build/three.min',
        controls: '../bower_components/threejs/examples/js/controls/TrackballControls',
        detector: '../bower_components/threejs/examples/js/Detector'
    },
    shim: {
        'three': {
            exports: 'THREE'
        },
        'detector': {
            exports: 'detector'
        },
        'controls': {
            exports: 'controls',
            deps : ['three']
        }
    },
});

require(['scene'], function() {
    'use strict';

    var vcard = document.querySelector('.jumbotron')
    vcard.className += ' active'
});

// Check if a new cache is available on page load.
window.addEventListener('load', function(e) {

  window.applicationCache.addEventListener('updateready', function(e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
      // Browser downloaded a new app cache.
      // Swap it in and reload the page to get the new hotness.
      window.applicationCache.swapCache();
      if (confirm('A new version of this site is available. Load it?')) {
        window.location.reload();
      }
    } else {
      // Manifest didn't changed. Nothing new to server.
    }
  }, false);

}, false);