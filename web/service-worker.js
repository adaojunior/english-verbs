


(function(global) {
    'use strict';

    importScripts('js/sw-toolbox.js');

    ///toolbox.options.debug = true;

    toolbox.router.get('/', toolbox.fastest);
    toolbox.router.get('/verb/:verb', toolbox.fastest);
    toolbox.router.get('/css/(.*)', toolbox.fastest);
    toolbox.router.get('/main.dart.js', toolbox.fastest);

    global.toolbox.router.default = global.toolbox.fastest;

    global.addEventListener('install', function(event) {
        event.waitUntil(global.skipWaiting())
    });

    global.addEventListener('activate', function(event){
        event.waitUntil(global.clients.claim())
    });

    toolbox.precache(['img/b-search.png']);

})(self);