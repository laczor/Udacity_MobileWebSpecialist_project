var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', function () {
    console.log('hello world')
    return gulp.src('public/js/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./public/dist'));
});
