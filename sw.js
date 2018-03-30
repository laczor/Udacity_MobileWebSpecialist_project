console.log('service worker added');

var staticCacheName = 'restaurant-app-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        'data/restaurants.json',
        '/public/js/main.js',
        '/public/js/restaurant_info.js',
        '/public/js/dbhelper.js',
        '/public/css/styles.css',
        '/public/img/1.jpg',
        '/public/img/2.jpg',
        '/public/img/3.jpg',
        '/public/img/4.jpg',
        '/public/img/5.jpg',
        '/public/img/6.jpg',
        '/public/img/7.jpg',
        '/public/img/8.jpg',
        '/public/img/9.jpg',
        '/public/img/10.jpg',
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-') &&
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
      return response || fetch(event.request);
    })
  );
});



