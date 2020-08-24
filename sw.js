const cacheName = 'k-58-v1';
const urlsToCache = [
    '/keisuke-58.github.io/',
    '/github.js',
    '/index.html',
    '/style.css'
];

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open(cacheName).then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/github.js',
       '/style.css',
       '/android-chrome-192x192.png',
       '/android-chrome-512x512.png',
     ]);
   })
 );
});

self.addEventListener('fetch', function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
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