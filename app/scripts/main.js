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