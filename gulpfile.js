var gulp = require('gulp'),
    react = require('gulp-react'),
    babel = require('gulp-babel'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    uglify = require('gulp-uglifyjs'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    del = require('del'),
    concat = require('gulp-concat');

var browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream');

var jsPaths = ['./*.js', './src/components/*.jsx', './src/*.jsx', './lib/*.js', './lib/routes/*.js', './lib/routes/test/*.js'];

//Clean dist folder
gulp.task('clean', function() {
   return del(['dist']); 
});

//Compile LESS and Minify CSS 
gulp.task('less', function() {
    return gulp.src('./src/styles/*.less')
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist'));
});

//Lint JavaScript
gulp.task('lint', function() {
    return jsPaths.map(function(path) {
        return gulp.src(path)
            .pipe(react({es6module: true}))
            .pipe(jshint({
                esversion: 6
            }))
            .pipe(jshint.reporter('default'));
    });
});

//Minify Javascript and copy it to dist directory 
//Original
/*gulp.task('minifyJS', function() {
    return gulp.src('./src/*.jsx')
        .pipe(react({es6module: true}))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist'));
});*/

//New
gulp.task('minifyJS', function () {
  browserify({
    entries: 'src/app.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('app.min.js'))
  .pipe(gulp.dest('dist'));
});

//Watch files for changes 
gulp.task('watch', function() {
    gulp.watch('src/styles/*.less', ['less']);
    gulp.watch(jsPaths, ['lint']);
    gulp.watch('./src/*.jsx', ['minifyJS']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('less', 'lint', 'minifyJS', 'watch');
});