'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var standard = require('gulp-standard');

var DEST = './';

gulp.task('lint', function () {
    gulp.src(['./src/hukd.js'])
        .pipe(standard())
        .pipe(standard.reporter('default', {
            breakOnError: true
        }))
});

gulp.task('mocha', function() {
    gulp.src(['test/**/*.js'])
        .pipe(mocha())
        .on('error', gutil.log)
});

gulp.task('build', function() {
    gulp.src('src/hukd.js')
        .pipe(uglify())
        .pipe(rename({basename: 'index'}))
        .pipe(gulp.dest(DEST))
});

gulp.task('test', ['lint', 'build', 'mocha']);

gulp.task('build', ['build']);

gulp.task('default', ['test']);