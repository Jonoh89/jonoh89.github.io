var gulp = require('gulp'),
    compass = require('gulp-compass'),
    path = require('path');

var paths = {
    scss: 'assets/_scss/*.scss'
};

gulp.task('compass', function() {
    return gulp.src(paths.scss)
        .pipe(compass({
            project: path.join(__dirname, 'assets'),
            css: 'css',
            sass: '_scss'
        }))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scss, ['compass']);
});