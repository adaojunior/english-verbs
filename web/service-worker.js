


(function(global) {
    'use strict';

    importScripts('js/sw-toolbox.js');

    toolbox.options.debug = true;

    toolbox.router.get('/', toolbox.networkFirst);
    toolbox.router.get('/#/verb/:verb', toolbox.networkFirst);
    toolbox.router.get('/css/(.*)', toolbox.networkFirst);
    toolbox.router.get('/main.dart.js', toolbox.networkFirst);

    global.toolbox.router.default = global.toolbox.networkFirst;

    global.addEventListener('install', function(event) {
        event.waitUntil(global.skipWaiting())
    });

    global.addEventListener('activate', function(event){
        event.waitUntil(global.clients.claim())
    });

    toolbox.precache(['img/b-search.png']);

})(self);