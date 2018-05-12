var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    order = require("gulp-order"),
    cleanCSS = require('gulp-clean-css'),
    imageResize = require('gulp-image-resize'),
    rename = require("gulp-rename"),
    imagemin = require('gulp-imagemin');
    
//Will minify the css files
gulp.task('copyCss', function() {
    gulp.src('public/css/*css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css/'))
});

//This would copy simply the images

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
    //   "public/js/lazysizes.js",
      "public/js/main.js",
    ], { base: './' }))
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist/js/'))
});

//It will read all of the js files and will concat them in order, than will transiple them with bable
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

//It will look all of the images in the described folder, call the imageResize pacakge and with renaming it will rename the
gulp.task("copyImgsDesktop", function () {
    gulp.src("public/img/*.{jpg,png}")
      .pipe(imageResize({ width : 333, height:250}))
      .pipe(rename(function (path) { path.basename += "-desktop"; }))
      .pipe(imagemin())
      .pipe(gulp.dest("dist/img"));
  });


gulp.task("copyImgsMobile", function () {
    gulp.src("public/img/*.{jpg,png}")
      .pipe(imageResize({ width : 250, height:180}))
      .pipe(rename(function (path) { path.basename += "-mobile"; }))
      .pipe(imagemin())
      .pipe(gulp.dest("dist/img"));
  });

gulp.task('default', ['copyCss','js_info','js_main','copyImgsDesktop','copyImgsMobile']);