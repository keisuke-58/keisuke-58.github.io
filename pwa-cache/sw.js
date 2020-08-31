//importScripts('/pwa-examples/ini.js');
const CACHE_NAME = 'pwa-cache-v1';
const CACHE_ALLOWLIST = [
    'pwa-cache-v2'
];

self.addEventListener('install', e => {
    // V1
    console.log('V1 install');
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.add('digital-signage-sample.jpg'))
    );
    
    // V2
    /*console.log('V2 install');
    e.waitUntil(
        caches.open('pwa-cache-v2').then(cache => cache.add('/pwa-cache/digital-signage-sample-3.jpg'));
    );*/
});

self.addEventListener('activate', e => {
    // V1
    console.log('V1 activate');
    
    // V2
    /*e.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if(!CACHE_ALLOWLIST.includes(key)){
                    return caches.delete(key);
                }
            })
        )).then(() => {
            console.log('V2 activate');
        });
    );*/
});

self.addEventListener('fetch', e => {
    // V1
    const url = new URL(e.request.url);
    if(url.origin == location.origin && url.pathname == 'digital-signage-sample.jpg'){
        e.respondWith(caches.match('digital-signage-sample-2.jpg'));
    }
    
    // V2
    /*const url = new URL(e.request.url);
    if(url.origin == location.origin && url.pathname == '/pwa-cache/digital-signage-sample.jpg'){
        e.respondWith(caches.match('/pwa-cache/digital-signage-sample-3.jpg'));
    }*/
});