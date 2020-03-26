/**
 * import dependencies
 * @ nunjucks - templating engine
 * @ fs - file system to write nunjucks rendered html to file
 */
const Freemarker = require('freemarker'); /* !!!! not used in this version !!!! */
const Nunjucks = require('nunjucks');
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * @ htmlEscapes - list of HTML escape characters
 * @ htmlEscaper - regex pattern containing the keys listed immediately above in htmlEscapes
 * @ escapeHTML - helper function to run on rendered nunjucksHTML string
 */
const htmlEscapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
  '&#x2F;': '/'
};

const mqEscapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
  '&#x2F;': '/'
};

const htmlEscaper = /(&amp;)|(&lt;)|(&gt;)|(&quot;)|(&#x27;)|(&#x2F;)/gi;

const escapeHTML = string => {
  return ('' + string).replace(htmlEscaper, match => {
    return htmlEscapes[match];
  });
};

/**
 * @ nunjucks.configure - set parent directory for nunjucks engine
 * @ fs.readdir - get all copy files directory
 * @ copyDirPath - file path to the copies directory
 */
Nunjucks.configure('.');
const copyDirPath = './src/copy';

// LOCALIZED DATA
const copyData = [];
const localHTML = [];
const pt = [];
const langs = [];

fs.readdir(copyDirPath, async (err, files) => {
  // handling error
  if (err) {
    console.log(`Unable to scan directory: ${err.message}`);
  }

  // loop through all files and add contents to arrays: copyData, localHTML, pt, langs
  await files.forEach(file => {
    const yamlData = fs.readFileSync(`${copyDirPath}/${file}`, 'utf8');
    const localCopy = yaml.safeLoad(yamlData);
    const langName = file.replace('.yml', '');
    langs.push(langName);
    copyData.push(localCopy);
    const html = Nunjucks.render(`./src/index.html`, {
      n: '${manage_prefs()}',
      copy: localCopy,
      env: {
        language: {
          short_name: langName
        }
      }
    });
    const textData = Nunjucks.render(`./src/plain.html`, {
      copy: localCopy,
      env: {
        language: {
          short_name: langName
        }
      }
    });
    pt.push(textData);
    localHTML.push(html);
  });

  // loop through html and plain-text content and write files to staging folder ./src/stage
  for (let i = 0; i < localHTML.length; i++) {
    // html
    fs.writeFile(`./src/stage/Default.${langs[i]}.html`, escapeHTML(localHTML[i]), err => {
      return err
        ? console.log(`Error saving file: See exception (${err.message})`)
        : console.log(`The ${langs[i]} file was saved successfully!`);
    });
    // plain text
    fs.writeFile(`./src/stage/Default.${langs[i]}.txt`, escapeHTML(pt[i]), err => {
      return err
        ? console.log(`Error saving file: See exception (${err.message})`)
        : console.log(`The ${langs[i]} plain text file was saved successfully!`);
    });
  }
});

// export copyData if need to use elsewhere
module.exports = copyData;
