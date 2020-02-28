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
let data = yaml.load(fileContents);

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

/**
 * @ htmlEscapes - list of HTML escape characters
 * @ htmlEscaper - regex pattern containing the keys listed immediately above in htmlEscapes
 * @ escapeHTML - helper function to run on rendered nunjucksHTML string
 * @ fs.writeFile - writes the nunjucks html string to the file path specified in htmlPath
 */

const htmlEscapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
  '&#x2F;': '/'
};

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
