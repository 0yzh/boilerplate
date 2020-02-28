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
git clone https://github.com/0yzh/boilerplate.git
```

## Install dependencies

On the command line, navigate to the newly created `boilerplate` folder and run npm install:

```shell
cd boilerplate && npm install
```

Next, start the npm dev script. This will monitor any changes you make to `src/index.html` or to any files in `src/less/` and automatically run the build process `npm run build` when changes are detected.

```shell
npm run dev
```
**Note:** This puts the terminal into a 'watch' state, preventing additional terminal commands. Use Control + C to exit this mode.

## Development

You can add your development phase HTML in `index.html` located on the src folder level `boilerplate/src/index.html` and LESS in the: `boilerplate/src/less/styles.less` file.

When you're ready to compile, simply saving changes to your `src/index.html` file should automatically trigger a build process if the npm dev script is running: `npm run dev`.

If you did not start the dev script and want to manually compile your builds, run this command each time you want to build the final html: `npm run build`

Once the build process is complete there will be two new subfolders created in the `src` folder:

- `stage` contains the compiled nunjucks and LESS->CSS files.

- `build` contains the final HTML with rendered nunjucks data and inlined CSS / -premailer styles: `boilerplate/src/build/index.html`. **This is the HTML code you will copy and paste into your Gamma message.**

## Using layouts and partials

Layouts can be found in `src/layout` which contains `base_layout.html` and `sublayout.html` by default. Layout files can be extended as normal:
```jinja
  {%- extends './layout/sublayout.html' %}
```

You can add macros to the `partial/macro_base.html` file and import them into `src/index.html` as normal:
```jinja
  {% import "./partial/macro_base" as base %}
```
Calling the macro:
```jinja
  {{ base.spacer(25) }}
```
**Note:** This boilerplate only includes two macros (text and vertical spacer) which are commonly used. Additional macros can be added to `partial/macro_base.html`.

## Data

Data is passed through this method:
```js
// Code can be found in the 'build.js' file
// jinja data
const nunjucksHTML = nunjucks.render('index.html', { n: 1 });

// freemarker data | NOTE: FREEMARKER IS NOT INCLUDED FOR THIS VERSION
fm.render(nj, { Country: 'US' }, (err, result) => {});
```

# WIP...
