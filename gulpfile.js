var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    browserify = require('gulp-browserify');
    
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

gulp.task('js', function() {
    gulp.src('public/js/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('bundle.js'))
    // .pipe(gulp.dest('public/js/minified'))
    .pipe(gulp.dest('dist/js/'))
});

// gulp.task('browserify', function() {
//     // Single entry point to browserify 
//     gulp.src('public/js/minified/bundle.js')
//         .pipe(browserify({
//           insertGlobals : true,
//           debug : true
//         }))
//         .pipe(gulp.dest('./dist/js/'))
// });


gulp.task('default', ['copyCss', 'js']);