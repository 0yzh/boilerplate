const fs = require('fs');
const yaml = require('js-yaml');

const parseYAML = async () => {
  try {
    let fileContents = fs.readFileSync('./copy/en-US.yml', 'utf8');
    let data = await yaml.safeLoad(fileContents);

    for (const copy in data) {
      console.log(unescape(data[copy]));
    }
    // console.log(data['email-1'].features['feature-1']);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = parseYAML();
