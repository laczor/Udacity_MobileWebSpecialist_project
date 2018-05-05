// import idb from 'idb';
var dbPromise = idb.open('restaurant-db', 1, function(upgradeDb) {
  switch(upgradeDb.oldVersion) {
    case 0:
      var restaurantStore = upgradeDb.createObjectStore('restaurants',{keyPath: 'id'});
    case 1:
      var  restaurantStore = upgradeDb.transaction.objectStore('restaurants');
        restaurantStore.createIndex('id', 'id',{unique: true});
  }
});
/**
 * Common database helper functions.
 */
class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    //These are the settings to fetch the data from the server

    const port = 1337 // Change this to your server port
    return `http://localhost:${port}/restaurants`;

    //These are the setting to fetch from the restaurant.json, server by express

    // const port = 3000 // Change this to your server port
    // return `http://localhost:${port}/data/restaurants.json`;

  }

  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants(callback) {
    fetch(DBHelper.DATABASE_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(restaurants) {

        dbPromise.then(function(db) {
          var tx = db.transaction('restaurants', 'readwrite');
          var restaurantStore = tx.objectStore('restaurants');

          restaurants.map(function(el){
            restaurantStore.put(el);
          })

          return tx.complete;
        })
        callback(null,restaurants);

      
    }).catch(function(error) {
        dbPromise.then(function(db) {

        var tx = db.transaction('restaurants', 'readwrite');
        var restaurantStore = tx.objectStore('restaurants');

        restaurantStore.getAll().then(function(data){
            callback(null,data);
        })

      });
    });
  }


  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id, callback) {
    console.log('fetchin restaurant by id', id);
    fetch(DBHelper.DATABASE_URL+'/'+id)
    .then(function(response) {

      return response.json();

    })
    .then(function(restaurant) {
      callback(null,restaurant);

    }).catch(function(error) {
      console.log('now it should fetch data from the idb by id');
      dbPromise.then(function(db) {

        var tx = db.transaction('restaurants', 'readwrite');
        var restaurantStore = tx.objectStore('restaurants');

        var tx = db.transaction('restaurants', 'readwrite');
        var restaurantStore = tx.objectStore('restaurants');
        restaurantStore.get(Number(id)).then(
          function(data){
              console.log('found restaurant',data);
          }
        )
        
        callback(null,data);

      });
      
    });
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine, callback) {
    // Fetch all restaurants  with proper error handling
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given cuisine type
        const results = restaurants.filter(r => r.cuisine_type == cuisine);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given neighborhood
        const results = restaurants.filter(r => r.neighborhood == neighborhood);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants
        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
        }
        callback(null, results);
      }
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all neighborhoods from all restaurants
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
        callback(null, uniqueNeighborhoods);
      }
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all cuisines from all restaurants
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
        callback(null, uniqueCuisines);
      }
    });
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    return (`img/${restaurant.id}.jpg`);
  }

  /**
   * Map marker for a restaurant.
   */
  static mapMarkerForRestaurant(restaurant, map) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP}
    );
    return marker;
  }

}
