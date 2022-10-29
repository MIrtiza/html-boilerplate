let browserSync = require('browser-sync');
let gulp = require('gulp');
let sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
let sourcemaps = require('gulp-sourcemaps');


browserSync.init({
    proxy: "http://localhost:8090/"
});


gulp.task('browserSync', () => {
    browserSync({
        server: {
        },
        options: {
            reloadDelay: 250
        },
        notify: false
    });
});


gulp.task('build-css', () => {
    gulp.src('assets/style/{,/**/*}*.{scss,sass}')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed'
            //outputStyle: 'nested'
        }))
        .pipe(sourcemaps.write())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.reload({stream: true}));
});



gulp.task('watch', () => {
    gulp.watch('assets/style/**/*.scss', ['build-css']);
});


// Create Gulp Default Task
gulp.task('default', ['browserSync', 'watch', 'build-css']);
