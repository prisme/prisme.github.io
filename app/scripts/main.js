require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        three: '../bower_components/threejs/build/three.min',
        detector: '../bower_components/threejs/examples/js/Detector'
    },
    shim: {
        'three': {
            exports: 'THREE'
        },
        'detector': {
            exports: 'Detector'
        }
    },
});

require(['scene'], function() {
    'use strict';

    var vcard = document.querySelector('.jumbotron')
    vcard.className += ' active'
});