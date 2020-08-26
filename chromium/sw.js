// install
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('k-58-v1').then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/github.js',
                '/style.css',
                '/ini.js',
                '/android-chrome-192x192.png',
                '/android-chrome-512x512.png'
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