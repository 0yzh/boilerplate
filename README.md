# html-email template

## Prerequisites

You may need to install [Premailer gem](https://github.com/premailer/premailer/) before getting started. This is used by the gulp-premailer module.

```shell
sudo gem install premailer
```

## Getting started

Start by:

- Creating a new project folder.

- Navigate to the new folder directory in the terminal / CLI.

- Clone this repo:

```shell
git clone https://github.com/0yzh/email-dev.git
```

## Install dependencies

On the command line, navigate to the newly create `prod` folder and run npm install:

```shell
cd prod
npm install
```

Alternatively you can just run:

```shell
npm start
```

Which will start the app and also install the dependencies.

## Development

You can add your development phase HTML in the top level `prod/index.html` file and LESS in the: `prod/styles.less` file.

When you're ready to compile, run this command: `npm run build`

This will generate a two new folders inside `prod`:

- `stage` contains the compiled nunjucks and LESS->CSS files.

- `build` contains the final HTML with rendered nunjucks data and inlined CSS / -premailer styles: `/prod/build/index.html`

## Using layouts and partials

Layouts and modular components can be added to the `views` folder.

- Base layout example:
  ![alt text](https://drive.google.com/file/d/1Qo1vU8cDe5_uhx0STJsMiyOchOHvIVKI/view 'base layout')

- Sublayout example:
  ![alt text](https://drive.google.com/file/d/137oe93KBWZAIRnlEEIqwtfbzONQ1Inki/view 'base layout')

- You can add macros to the `partials` folder and import into `index.html` as normal:
  ```jinja
    {% import "partials/macro_base" as base %}
  ```

## Data

- Data is passed through this method:

```js
// Code can be found in the 'build.js' file
// jinja data
const htmlString = nunjucks.render('index.html', { n: 1 });

// freemarker data
fm.render(nj, { Country: 'US' }, (err, result) => {});
```

# WIP...
