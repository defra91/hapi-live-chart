'use strict';

var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var inject = require('gulp-inject');
var runSequence = require('run-sequence');

var path = {
    app: './app',
    views: {
        main: './app/*.html',
        files: './app/views/**/*.html'
    },
    scripts: {
        files: './app/scripts/**/*.js'
    },
    styles: {
        files: './app/styles/css/**/*.css'
    }
};

gulp.task('inject-own', function() {
    gulp.src(path.views.main)
        .pipe(inject(gulp.src([path.scripts.files, path.styles.files], {
            read: false
        }), {
            relative: true
        }))
        .pipe(gulp.dest(path.app));
});

gulp.task('inject-vendor', function() {
    return gulp.src(path.views.main)
        .pipe(wiredep({}))
        .pipe(gulp.dest(path.app));
});

gulp.task('start:server', function() {
    $.connect.server({
        root: [path.app],
        livereload: true,
        port: 9000
    });
});

gulp.task('build', function() {
    runSequence(['inject-vendor', 'inject-own']);
});

gulp.task('serve', ['start:server'], function() {
    openURL('http://127.0.0.1:9000');
});
