var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    order = require("gulp-order"),
    cleanCSS = require('gulp-clean-css');
    

gulp.task('copyCss', function() {
    gulp.src('public/css/*css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
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
      "public/js/lazysizes.js",
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

gulp.task('default', ['copyCss','js_info','js_main']);