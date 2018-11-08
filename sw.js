let staticCacheName = 'restaurant-reviews-v1';

self.addEventListener('install', function(event) {


// Define quais são os arquivos que serão cacheados
  event.waitUntil(
    caches.open(staticCacheName).then((cache) =>
      cache.addAll([
        '/',
        'js/main.js',
        'css/styles.css',
        'imgs/',
        'data/restaurants.json'
      ])
    )
  );
});

//Deleta cache de versões anteriores do app

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-reviews-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});



self.addEventListener('fetch', function(event) {
  event.respondWith(

    caches.match(event.request).then(function(response) {
      if (response){
        return response 
      }else{
        return fetch(event.request);
      }
    })
  );
});

// self.addEventListener('message', function(event) {
//   if (event.data.action === 'skipWaiting') {
//     self.skipWaiting();
//   }
// });