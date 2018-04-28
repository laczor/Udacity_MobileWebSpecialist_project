
var staticCacheName = 'restaurant-app-v1';              //This is where all of the js, html files will be cached
var contentImgsCache = 'restaurant-content-imgs';       //This is where all of the images will be saved

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        'data/restaurants.json',
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
  // console.log('this is fetching',requestUrl.pathname );

    if (requestUrl.pathname.endsWith('restaurants')) {   
      console.log('intercepting restaurants',requestUrl.pathname);

          event.respondWith(        
              fetch(event.request).then(function(response){
                  console.log('Response', response);
                  var clonedRes = response.clone()
                  var restaurants = clonedRes.json().then(function (data) {                           
                                                            console.log('writing data   ', data);
                                                            console.log('window  ', self);
                                                          for (var key in data) {
                                                          }
                                    
                                                      });
                  console.log('restaurants', restaurants);
              return response;  
              })
           );
          return;


      // console.log('intercepting restaurants')       
      // console.log('event', event);       
      // console.log('event.request', event.request);      
      // event.respondWith(fetch(event.request)                  
      // .then(function (res) {
      //   console.log('this is the response',res.json());
      //   var clonedRes = res.clone();                        
      //   clearAllData('restaurants')  
      //   .then(function () {
      //     return clonedRes.json();
      //             })
      //             .then(function (data) {                           
      //                 for (var key in data) {
      //                   console.log('writing data   ', data);
      //                   writeData('restaurants', data[key])
      //                 }

      //             });
      //       return res;                                         
      //     })
      // );
  }
// ------ Cache photos ----- 
    if (requestUrl.pathname.endsWith('.jpg')) {
        event.respondWith(servePhoto(event.request));
      return;
    }
//fetch everything from the network 
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );



});


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
