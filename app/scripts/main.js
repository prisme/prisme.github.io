require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        three: '../bower_components/threejs/build/three.min',
    },
    shim: {
        'three': {
            exports: 'THREE'
        }
    },
});

require(['scene'], function() {
    'use strict';

    var vcard = document.querySelector('.jumbotron')
    vcard.className += ' active'
});