importScripts('/pwa-examples/ini.js');
/*const CACHE_NAME = 'k-58-v1';
const SUCCESSIVE_CACHE = true;
const URLS_TO_CACHE = [
    '/pwa-examples/index.html',
    '/pwa-examples/github.js',
    '/pwa-examples/style.css',
    '/pwa-examples/ini.js',
    '/pwa-examples/android-chrome-192x192.png',
    '/pwa-examples/android-chrome-512x512.png'
];
const CACHE_ALLOWLIST = [
    'k-58-v2'
];*/

self.addEventListener('install', e => {
    console.log('V1 install');
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.add('/digital-signage-sample.jpg'))
    );
});

self.addEventListener('activate', e => {
    console.log('V1 activate');
});

self.addEventListener('fetch', e => {
    const url = new URL(e.request.url);
    if(url.origin == location.origin && url.pathname == '/digital-signage-sample-2.jpg'){
        e.respondWith(caches.match('/digital-signage-sample.jpg'));
    }
});