var gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    sass        = require('gulp-sass'),
    imagemin    = require('gulp-imagemin'),
    browserify  = require('browserify'),
    uglify      = require('gulp-uglify'),
    minifyHTML  = require('gulp-minify-html'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),
    neat        = require('node-neat'),
    livereload  = require('gulp-livereload');
    
var paths = {
    index:  './site/index.html',
    js:     './site/js/*.js',
    css:    './site/css/*.css',
    scss:   './site/scss*.scss',
    img:    './site/img/**',
};

// Minify index
gulp.task('html', function() {
  return gulp.src(paths.index)
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/'));
});

// JavaScript linting task
gulp.task('jshint', function() {
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
  return browserify('site/js/main.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

// Compile Sass task
gulp.task('sass', function() {
  return gulp.src(paths.scss)
    .pipe(sass({
        includePaths: neat.includePaths
    }))
    .pipe(gulp.dest('site/css'));
});

// Styles build task, concatenates all the files
gulp.task('styles', function() {
  return gulp.src(paths.css)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build/css'));
});

// Image optimization task
gulp.task('images', function() {
  return gulp.src(paths.img)
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});

// Watch task
gulp.task('watch', function() {
    // livereload.listen({basePath: 'build' });
    gulp.watch(paths.index, ['html']);
    gulp.watch(paths.js, ['jshint', 'scripts']);
    gulp.watch([paths.scss, ], ['sass', 'styles']);
    gulp.watch(paths.img, ['images']);
  
});

// Build task
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'styles', 'images']);

// Default task
gulp.task('default', ['build', 'watch']);

