/**
 * import dependencies
 * @ gulp - task runner
 * @ premailer - Preflight for HTML and CSS
 * @ inlinerCSS - CSS inliner
 */
const gulp = require('gulp');
const premailer = require('gulp-premailer');
const inlineCss = require('gulp-inline-css');

/**
 * set task
 * @ build - compiles a final version of index.html from ./stage/ and outputs it into ./build/
 * @ all string arguments can be modified as needed
 */
gulp.task('build', function() {
  return gulp
    .src('./stage/*.html')
    .pipe(premailer())
    .pipe(inlineCss({ preserveMediaQueries: true }))
    .pipe(gulp.dest('build/'));
});
