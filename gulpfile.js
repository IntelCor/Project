var gulp = require('gulp');
		concatCss = require('gulp-concat-css');
		cssnano = require('gulp-cssnano');
		rename = require('gulp-rename');
		browserSync = require('browser-sync').create();
		autoprefixer = require('gulp-autoprefixer');


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});


gulp.task('css', function () {
	gulp.src('sass/*.scss')
		.pipe(autoprefixer({
			browsers: ['last 16 versions'],
			cascade: false
		}))
		.pipe(concatCss('concat.css'))
		.pipe(gulp.dest('app/concat/'))
		.pipe(cssnano())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest('app/cssMin/'));
});

gulp.task('watch', function () {
	gulp.watch('sass/*.scss', ['css']);
	gulp.watch("app/*.html").on('change', browserSync.reload);
	gulp.watch("sass/*.scss").on('change', browserSync.reload);
});

gulp.task('default', ['css', 'watch', 'browser-sync']);		