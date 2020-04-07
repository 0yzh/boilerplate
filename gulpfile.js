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
const smoosher = require('gulp-smoosher');
const { zip } = require('zip-a-folder');

/**
 * set build tasks
 * @ build-html - compiles a final version of index.html from ./src/stage/ and outputs it into ./src/build
 * @ build-pt - same as build-html but for .txt files
 */
gulp.task('build-html', () => {
  return gulp
    .src('./src/stage/*.html')
    .pipe(smoosher())
    .pipe(inlineCss({
      preserveMediaQueries: true,
      codeBlocks: {
        HTML: { start: '<#', end: '>' },
        FM: { start: '</#', end: '>' }
      }
    }))
    .pipe(gulp.dest('./src/build/'));
});

gulp.task('build-pt', () => {
  return gulp
    .src('./src/stage/*.txt')
    .pipe(gulp.dest('./src/build/'));
});

/**
 * set compiler and export tasks
 * @ compile - loops through all files in staging folder and filter out html files excluding LPs
 * @ export - outputs an archive.zip file in the parent directory
 */
gulp.task('compile', async () => {
  try {
    const linksFile = './src/partial/links.ftl';
    await fs.readdir('./src/build', (err, files) => {
      // we only want html files here - also filtering out landing page files
      const htmlFiles = files.filter(el => /\.html$/.test(el))
        .filter(el => /\.lp.html$/.test(el) !== true);

      // log the file names
      console.log(htmlFiles)

      // loop through html files in directory and prepend freemarker links
      htmlFiles.forEach(async htmlFile => {
        const originalFile = `./src/build/${htmlFile}`;
        const fileData = await fs.readFileSync(originalFile).toString();
        const prependData = `${await fs.readFileSync(linksFile).toString()} \n\n ${fileData}`;
        await fs.writeFile(originalFile, prependData, err => {
          return err
            ? console.log(`Error saving file: See exception (${err.message})`)
            : null;
        });
      });
      console.log(`Build files compiled successfully! Rendered HTML for GAMMA can be found in ./src/build`);
    });
  } catch (error) {
    // handle error
    console.log(`Unable to scan directory: ${error.message}`);
  }
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