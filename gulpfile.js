/**
 * import dependencies
 * @ gulp - task runner
 * @ premailer - Preflight for HTML and CSS
 * @ inlinerCSS - CSS inliner
 */
const gulp = require('gulp');
const premailer = require('gulp-premailer');
const inlineCss = require('gulp-inline-css');
const fs = require('fs');
const { zip } = require('zip-a-folder');

/**
 * set task
 * @ build - compiles a final version of index.html from ./src/stage/ and outputs it into ./src/build/
 * @ all string arguments can be modified as needed
 */
gulp.task('build-html', () => {
  return gulp
    .src('./src/stage/*.html')
    .pipe(premailer())
    .pipe(inlineCss({ preserveMediaQueries: true }))
    .pipe(gulp.dest('./src/build/'));
});

gulp.task('build-pt', () => {
  return gulp
    .src('./src/stage/*.txt')
    .pipe(gulp.dest('./src/build/'));
});


gulp.task('compile', async () => {
  const linksFile = './src/partial/links.ftl';
  await fs.readdir('./src/build', (err, files) => {
    // handling error
    if (err) {
      console.log(`Unable to scan directory: ${err.message}`);
    }
    // we only want html files here
    const htmlFiles = files.filter(el => /\.html$/.test(el))
    // do something with your files, by the way they are just filenames...
    console.log(htmlFiles)
    // loop through html files in directory and prepend freemarker links
    htmlFiles.forEach(async htmlFile => {
      const originalFile = `./src/build/${htmlFile}`;
      const fileData = await fs.readFileSync(originalFile).toString();
      const prependData = `${await fs.readFileSync(linksFile).toString()} \n\n ${fileData}`;
      await fs.writeFile(originalFile, prependData, err => {
        return err
          ? console.log(`Error saving file: See exception (${err.message})`)
          : console.log(
            `File compiled successfully! HTML data for GAMMA has been sent to ${originalFile}`
          );
      });
    });
  });
});

gulp.task('export', async () => {
  class zipDir {
    static async main() {
      await zip('./src/build', `../${process.env.EXPORT_NAME || 'archive'}.zip`);
      console.log(`Zip file is located in dir: './../${process.env.EXPORT_NAME || 'archive'}.zip'`)
    }
  }
  zipDir.main();
});

gulp.task('localize', () => {
  return gulp
    .src('./src/stage/*.html')
    .pipe(premailer())
    .pipe(inlineCss({ preserveMediaQueries: true }))
    .pipe(gulp.dest('./src/build/'));
});
