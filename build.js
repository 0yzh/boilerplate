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
 * Parse YAML data
 * will be replaced by copy on live build
 */
const yaml = require('js-yaml');

let fileContents = fs.readFileSync('./src/copy/en-US.yml', 'utf8');
let data = yaml.load(fileContents, { json: true });

// console.log(data);
// console.log(data['email-1'].features['feature-1']);
// let { headline } = data['email-1'].features['feature-1'];

/**
 * @ htmlPath - file path that we want to output the staging html file
 * @ htmlPath/index.html - this is the same file gulp will use to run inline-css and premailer
 * @ nunjucks.configure - set parent directory for nunjucks engine
 * @ htmlString - returns an html string with rendered nunjucks data
 */
const htmlPath = './src/stage/index.html';

Nunjucks.configure('.');
const nunjucksHTML = Nunjucks.render('./src/index.html', {
  n: 1,
  data: data
});

const htmlEscapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
  '&#x2F;': '/'
};

// Regex containing the keys listed immediately above.
const htmlEscaper = /(&amp;)|(&lt;)|(&gt;)|(&quot;)|(&#x27;)|(&#x2F;)/ig;

const escapeHTML = string => {
  return ('' + string).replace(htmlEscaper, match => {
    return htmlEscapes[match];
  });
};

fs.writeFile(htmlPath, escapeHTML(nunjucksHTML), err => {
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
