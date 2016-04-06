'use strict';

var watchify = require('watchify'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    autoprefixer = require('gulp-autoprefixer'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    server = require('gulp-webserver'),
    _ = require('lodash');

var customOpts = {
  entries: ['./index.js'],
  debug: true
};
var opts = _.assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts).transform(babelify));
b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
}

// Tasks
gulp.task('serve', function() {
  gulp.src('.')
    .pipe(server({
      fallback: 'index.html',
      livereload: true,
      directoryListening: true,
      port: 8001,
      open: true
    }));
});

gulp.task('sass', function() {
  gulp.src(['./sass/*.sass', './sass/*.scss'])
      .on('error', function(e) {
        handleError(e, this);
      })
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sass({indentationSyntax: true}))
      .pipe(autoprefixer('last 2 versions'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist'))
});

gulp.task('build', bundle);
