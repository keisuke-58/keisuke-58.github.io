const cacheName = 'k-58-v1';
const appShellFiles = [
    '/keisuke-58.github.io/',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
    '/apple-touch-icon.png',
    '/browserconfig.xml',
    '/favicon-16x16.png',
    '/favicon-32x32.png',
    '/favicon.ico',
    '/github.js',
    '/index.html',
    '/mstile-144x144.png',
    '/mstile-150x150.png',
    '/mstile-310x150.png',
    '/mstile-310x310.png',
    '/mstile-70x70.png',
    '/safari-pinned-tab.svg',
    '/site.webmanifest',
    '/style.css',
    '/sw.js'
];

// install
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(appShellFiles);
        })
    );
});

// fetch cache load
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response ? response : fetch(event.request)
        });
    );
});