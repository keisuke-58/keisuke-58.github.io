// install
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('k-58-v1').then(function(cache) {
            return cache.addAll([
                '/chromium/index.html',
                '/chromium/github.js',
                '/chromium/style.css',
                '/chromium/ini.js',
                '/chromium/android-chrome-192x192.png',
                '/chromium/android-chrome-512x512.png'
            ]);
        })
    );
});

// fetch cache load
self.addEventListener('fetch', function(e) {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});