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
 * @ nunjucks.configure - set parent directory for nunjucks engine
 * @ fs.readdir - get all copy files directory
 * @ copyDirPath - file path to the copies directory
 */
const env = Nunjucks.configure('./src', { autoescape: false });
const copyDirPath = './src/copy';

const testHTML = fs.readFileSync('./src/index.html').toString();
const testLP = fs.readFileSync('./src/landing.html').toString();
const testPT = fs.readFileSync('./src/plain.html').toString();

// LOCALIZED DATA
const copyData = [];
const localHTML = [];
const lpHTML = [];
const pt = [];
const langs = [];

fs.readdir(copyDirPath, async (err, files) => {
  // handling error
  if (err) {
    console.log(`Error reading directory: ${err.message}`);
  }

  await files.forEach(file => {
    const yamlData = fs.readFileSync(`${copyDirPath}/${file}`, 'utf8');
    const localCopy = yaml.safeLoad(yamlData);
    const langName = file.replace('.yml', '');
    langs.push(langName);
    copyData.push(localCopy);
    const html = Nunjucks.compile(testHTML, env).render({
      copy: localCopy,
      env: {
        language: {
          short_name: langName,
          content_type: 'email'
        }
      }
    });
    const lpData = Nunjucks.compile(testLP, env).render({
      copy: localCopy,
      env: {
        language: {
          short_name: langName,
          content_type: 'landing_page'
        }
      }
    });
    const textData = Nunjucks.compile(testPT, env).render({
      copy: localCopy,
      env: {
        language: {
          short_name: langName,
          content_type: 'plaintext'
        }
      }
    });
    pt.push(textData);
    localHTML.push(html);
    lpHTML.push(lpData);
    for (let i = 0; i < localHTML.length; i++) {
      // html
      fs.writeFile(`./src/stage/Default.${langs[i]}.html`, localHTML[i], err => {
        return err
          ? console.log(`Error saving file: See exception (${err.message})`)
          : console.log(`The ${langs[i]} file was saved successfully!`);
      });
      // landing page
      fs.writeFile(`./src/stage/Default.${langs[i]}.lp.html`, lpHTML[i], err => {
        return err
          ? console.log(`Error saving file: See exception (${err.message})`)
          : console.log(`The ${langs[i]} landing page file was saved successfully!`);
      });
      // plain text
      fs.writeFile(`./src/stage/Default.${langs[i]}.txt`, pt[i], err => {
        return err
          ? console.log(`Error saving file: See exception (${err.message})`)
          : console.log(`The ${langs[i]} plain text file was saved successfully!`);
      });
    }
  });
});

// export copyData if need to use elsewhere
module.exports = copyData;
