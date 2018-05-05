var express = require("express");
var app     = express();
// var path = require('path');
// To tell express what should be the routefile for the files


/**
 *    Problem: 1
 *      If all of the original js files, html files are served from the public folder with express 
 *      then everything is fine until i try to write the following code
 * 
 *        main.js 
 *              import idb from 'idb'
 * 
 *        Will get the following error ' Uncaught SyntaxError: Unexpected identifier'
 *        This could be due to the ES6 syntax, which can't be translated in the browers, client side js
 */   

// app.use(express.static(('public')));

/**
 *    Problem: 2
 *        In order to make the client side understand ES6
 *          i used gulp to
 *                          - Transpile es5 to es6
 *                          - create a bundle.js
 *                          - copy html, css files
 * 
 *          into the dist folder, where every file is located
 *        But when i try to run the application (including the import script in main.js) i get the following error
 *                -  Uncaught (in promise) TypeError: Failed to fetch
 *                - sw.js:90 Uncaught (in promise) TypeError: Failed to execute 'fetch' on 'ServiceWorkerGlobalScope': 'only-if-cached' can be set only with 'same-origin' mode
    at
                  - require is not defined  (for that i tried to use  browserify plugin)
 */     

 /**
  *     Question, what should be changed in the gulpfile, to serve the serviceWorker correctly?
  *     Question, what should be changed in the gulpfile, to be able to use the idb module in the client side, for indexedDB?
  * 
  */
 
app.use(express.static(('dist')));

//Store all HTML files in view folder.

app.get('/restaurants',function(req,res){
  res.sendFile('restaurant.html',{ root: __dirname + '/dist/' });
  //It will find and locate index.html from View or Scripts
});

app.get('/',function(req,res){
  res.sendFile('index.html');
  //It will find and locate index.html from View or Scripts
});

app.listen(3000);

console.log("Running at Port 3000");