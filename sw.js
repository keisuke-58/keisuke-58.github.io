const CACHE_NAME = 'k-58-v1';
const SUCCESSIVE_CACHE = false;
const URLS_TO_CACHE = [
    '/index.html',
    '/github.js',
    '/style.css',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png'
];

// install
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

// fetch cache load
self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => {
            if(!SUCCESSIVE_CACHE){
                return response ? response : fetch(e.request);
            }else{
                if(response){
                    return response;   
                }else{
                    let fetchRequest = e.request.clone();
                    return fetch(fetchRequest).then((response) => {
                        if(!response || response.status !== 200 || response.type !== 'basic'){
                            return response;
                        }

                        let responseToCache = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(e.request, responseToCache);
                        });

                        return response;
                    })
                }
            }
        })
    );
});

// service worker update
self.addEventListener('activate', (e) => {
    let = cacheAllowlist = ['k-58-v2'];
    e.waitUntil(
        caches.keys().then((cacheName) => {
            /*return Promise.all(
                cacheNames.map((cacheName) => {
                    if(cacheAllowlist.indexOf(cacheName) !== -1){
                    if(cacheAllowlist.indexOf(cacheName) !== -1){
                        return caches.delete(cacheName);
                    }
                })
            );*/
            console.log(cacheName);
        })
    );
});


// install
/*self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});*/

// fetch cache load
/*self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            //return response ? response : fetch(event.request);
            if(response){
                return response;   
            }else{
                let fetchRequest = event.request.clone();
                return fetch(fetchRequest).then((response) => {
                    if(!resopnse || response.status !== 200 || response.type !== 'basic'){
                        return response;
                    }
                    
                    let responseToCache = response.clone();
                    caches.open(cacheName).then((cache) => {
                        cache.put(event.request, resposeToCache);
                    });
                    
                    return response;
                });
            }
        })
    );
});*/

// update service worker
/*self.addEventListener('activate', (event) => {
    let cacheAllowlist = ['pages-cache-v1'];
    event.waitUntil(
        caches.keys().then((cacheName) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if(cacheAllowlist.indexOf(cacheName) === -1){
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    );
});*/