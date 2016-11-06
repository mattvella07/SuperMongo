var gulp = require('gulp'),
    react = require('gulp-react'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    del = require('del'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify'),
    pump = require('pump');

var jsPaths = ['./*.js', './src/components/*.jsx', './src/*.jsx', './lib/*.js', './lib/routes/*.js', './lib/routes/test/*.js'];

//Clean dist folder
gulp.task('clean', function() {
   return del(['dist']); 
});

//Compile LESS and Minify CSS 
gulp.task('less', function(cb) {
    pump([
        gulp.src('./src/styles/*.less'),
        less(),
        cleanCSS(),
        rename({ suffix: '.min' }),
        gulp.dest('dist')
    ], cb);
});

//Lint JavaScript
gulp.task('lint', function(cb) {
    pump([
        gulp.src(jsPaths),
        react({es6module: true}),
        jshint({esversion: 6}),
        jshint.reporter('default')
    ], cb);
});

//Minify JavaScript and move it to dist folder 
gulp.task('minifyJS', function(cb) {
    pump([
        browserify({
            entries: 'src/app.jsx',
            extensions: ['.jsx'],
            debug: true
        }).transform(babelify).bundle(),
        source('app.min.js'),
        streamify(uglify()),
        gulp.dest('dist')
    ], cb);
});

//Watch files for changes 
gulp.task('watch', function() {
    gulp.watch('src/styles/*.less', ['less']);
    gulp.watch(jsPaths, ['lint']);
    gulp.watch(['./src/*.jsx', './src/components/*.jsx'], ['minifyJS']);
});

//Initial task 
gulp.task('default', ['clean'], function() {
    gulp.start('less', 'lint', 'minifyJS', 'watch');
});