var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    browserify = require('gulp-browserify'),
    order = require("gulp-order");
    
// gulp.task('copyHtml', function() {
//     gulp.src('public/*.html')
//     .pipe(gulp.dest('dist/'))
// });

gulp.task('copyCss', function() {
    gulp.src('public/css/*css')
    .pipe(gulp.dest('dist/css/'))
});

// gulp.task('copyImg', function() {
//     gulp.src('public/img/*.jpg')
//     .pipe(gulp.dest('dist/img/'))
// });

gulp.task('js_main', function() {
    gulp.src('public/js/*.js')
    .pipe(gulp.src("public/js/*.js")) // gulp.src passes through input
    .pipe(order([
      "public/js/promise.js",
      "public/js/fetch.js",
      "public/js/idb.js",
      "public/js/dbhelper.js",
    //   "public/js/idbhelper.js",
      "public/js/main.js",
    ], { base: './' }))
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist/js/'))
});

gulp.task('js_info', function() {
    gulp.src('public/js/restaurant/*.js')
    .pipe(gulp.src("public/js/restaurant/*.js")) // gulp.src passes through input
    .pipe(order([
        "public/js/restaurant/fetch.js",
        "public/js/restaurant/idb.js",
        "public/js/restaurant/dbhelper.js",
        // "public/js/restaurant/idbhelper.js",
        "public/js/restaurant/restaurant_info.js",
      ], { base: './' }))
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('bundle_restaurant_info.js'))
    .pipe(gulp.dest('dist/js/'))
});

// //Using bablify you can use es6 import in the client side
// https://stackoverflow.com/questions/34276574/browserify-and-babel-gulp-tasks?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
// gulp.task('browserify', function() {
//     return gulp.src('public/dbhelper.js')
//         .pipe(browserify({ insertGlobals : true }))
//         .pipe(gulp.dest('public/js/'));
// });


// gulp.task('browserify', function() {
//     // Single entry point to browserify 
//     gulp.src('public/dbhelper.js')
//         .pipe(browserify({
//           insertGlobals : true,
//           debug : true
//         }))
//         .pipe(gulp.dest('.public/js/'))
// });


gulp.task('default', ['copyCss','js_info','js_main']);