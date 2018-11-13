let staticCacheName = 'restaurant-reviews-v1';

self.addEventListener('install', function(event) {


// Define quais são os arquivos que serão cacheados
  event.waitUntil(
    caches.open(staticCacheName).then((cache) =>
      cache.addAll([
        '/',
        '/index.html',
        '/css/styles.css',
        '/data/restaurants.json',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/restaurant.html'
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