'use strict';

var watchify = require('watchify'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    _ = require('lodash'),
    server = require('gulp-webserver');

var customOpts = {
  entries: ['./index.js'],
  debug: true
};
var opts = _.assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts).transform(babelify));

gulp.task('js', bundle);
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
