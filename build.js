/**
 * import dependencies
 * @ nunjucks - templating engine
 * @ fs - file system to write nunjucks rendered html to file
 */
const Freemarker = require('freemarker');
const Nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');

/**
 * @ htmlPath - file path that we want to output the staging html file
 * @ htmlPath/index.html - this is the same file gulp will use to run inline-css and premailer
 * @ nunjucks.configure - set parent directory for nunjucks engine
 * @ htmlString - returns an html string with rendered nunjucks data
 */
const htmlPath = './stage/index.html';

Nunjucks.configure('.');
const nunjucksHTML = Nunjucks.render('index.html', { n: 1 });

fs.writeFile(htmlPath, nunjucksHTML, err => {
  return err
    ? console.log(`Error saving file: See exception (${err})`)
    : console.log('The file was saved successfully!');
});

/**
 * handle Nunjucks and Freemarker data rendering
 * @ htmlPath - defined above
 * @ htmlString - defined above
 * @ fs.writeFile - writes the nunjucks html string to the file path specified in htmlPath
 */
/* not used for this version
const fm = new Freemarker();
function renderData(nj, filePath) {
  fm.render(nj, { Country: 'US' }, (err, result) => {
    if (err) {
      console.log(Error(err));
    }
    fs.writeFile(filePath, result, err => {
      return err
        ? console.log(`Error saving file: See exception (${err})`)
        : console.log('The file was saved successfully!');
    });
  });
}
renderData(nunjucksHTML, htmlPath);
*/
