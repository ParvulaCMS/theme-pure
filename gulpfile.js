'use strict'

let gulp = require('gulp')
let sass = require('gulp-sass')
let browserSync = require('browser-sync').create()

let inputPath = './style'
let outputPath = './style'

// Compile sass files
gulp.task('build', () => {
  gulp.src(`${inputPath}/**/*.{scss,sass}`)
    .pipe(sass({
      outputStyle: 'expanded' // nested, expanded, compact, compressed
    })).on('error', sass.logError)
    .pipe(gulp.dest(outputPath))
    .pipe(browserSync.stream())
})

// Watch sass files
gulp.task('watch', () => {
  gulp.watch(`${inputPath}/**/*.{scss,sass}`, ['build'])
})

// Static server and watching scss files
gulp.task('serve:sass', ['build'], () => {
    browserSync.init();

    gulp.watch(`${inputPath}/**/*.{scss,sass}`, ['build'])
});

// Static server and watching scss, html, php and yaml files
gulp.task('serve', ['serve:sass'], () => {
    gulp.watch("**/*.{php,html,htm,yaml,yml}").on('change', browserSync.reload)
});

gulp.task('default', ['serve'])
