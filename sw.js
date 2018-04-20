var staticCacheName = 'restaurant-app-v1';              //This is where all of the js, html files will be cached
var contentImgsCache = 'restaurant-content-imgs';       //This is where all of the images will be saved

// /**
//  * openDatabase
//  *
//  * @description :: Will open the indexedDB database if there is a service worker
//  */

// function openDatabase() {
//   // If the browser doesn't support service worker,
//   // we don't care about having a database
//   if (!navigator.serviceWorker) {
//     return Promise.resolve();
//   }

//   return idb.open('restaurant', 1, function(upgradeDb) {
//     var store = upgradeDb.createObjectStore('restaurant', {
//       keyPath: 'id'
//     });
//   });
// }


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        // 'data/restaurants.json',
        '/public/js/main.js',
        '/public/js/restaurant_info.js',
        '/public/js/dbhelper.js',
        '/public/css/styles.css',
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
  var requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {

    // if (requestUrl.pathname.endsWith('/restaurants')) {
    //   event.respondWith(serveRestaurants(event.request));
    //   return;
    // }

// ------ Cache photos ----- 
    if (requestUrl.pathname.endsWith('.jpg')) {
        event.respondWith(servePhoto(event.request));
      return;
    }

  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );



});

function serveRestaurants(request){

  console.log(openDatabase());

  fetch(event.request)
  .then(function(response) {

    return response.json();

  })
  .then(function(restaurants) {
    console.log('recieved',restaurants);
    callback(null,restaurants);

  }).catch(function(error) {
    console.log('There has been a problem with your fetch operation: ', error.message);
  });

}


function servePhoto(request) {
  var storageUrl = request.url.replace(/-\d+px\.jpg$/, '');
  //1. Will try to load the images-cache
  return caches.open(contentImgsCache).then(function(cache) {
    //2. Will try to match the url from the cache
    return cache.match(storageUrl).then(function(response) {
      //3. If there is a response it will return with it from the cache
      if (response) return response;
      //4. If not it will fetch the data
      return fetch(request).then(function(networkResponse) {
        //5. Then it will save it in the cache
        cache.put(storageUrl, networkResponse.clone());
        return networkResponse;
      });
    });
  });
}


