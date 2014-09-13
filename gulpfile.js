var gulp = require('gulp'),
    compass = require('gulp-compass'),
    path = require('path'),
    imageResize = require('gulp-image-resize');

var paths = {
    scss: 'assets/_scss/*.scss',
    postImages: 'assets/images/posts/*'
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

gulp.task('resize-images', function () {
    gulp.src(paths.postImages)
        .pipe(imageResize({
            width: 128
        }))
        .pipe(gulp.dest('assets/images/resizedPosts'))
});