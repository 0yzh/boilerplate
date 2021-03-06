# html-email template

## Prerequisites

You may need to install [Premailer gem](https://github.com/premailer/premailer/) before getting started. This is used by the gulp-premailer module.

```shell
sudo gem install premailer
```

## Getting started

Start by cloning this repo to your local machine.
```shell
git clone https://github.com/0yzh/boilerplate.git
```

## Install dependencies

On the command line, navigate to the newly created `boilerplate` folder and run npm install:
```shell
cd boilerplate && npm install
```
**Note:** You can rename the `boilerplate` directory to something more relevant to your email project.

Next, start the npm dev script. This will monitor any changes you make to `src/index.html` or to any files in `src/less/` and automatically run the build process `npm run build` when changes are detected.
```shell
npm run dev
```
**Note:** This puts the terminal into a 'watch' state, preventing additional terminal commands. Use Control + C to exit this mode.

## Development

You can add your development phase HTML code in `index.html` located on the src folder level `boilerplate/src/index.html` and LESS in the: `boilerplate/src/less/styles.less` file.

When you're ready to compile, simply saving changes to your html or less files should automatically trigger a build process if the npm dev script is running: `npm run dev`.

If you did not start the dev script and want to manually compile your builds, run this command each time you want to build the final html: `npm run build`

Once the build process is complete there will be two new subfolders created in the `src` folder:

- `stage` contains the compiled nunjucks and LESS->CSS files.

- `build` contains the final HTML with rendered nunjucks data and inlined CSS / -premailer styles: `boilerplate/src/build/index.html`. **This is the HTML code you will copy and paste into your campaign message.**

## Using layouts and partials

Layouts can be found in `src/layout` which contains `base_layout.html` and `sublayout.html` by default. Layout files can be extended as normal:
```jinja
{%- extends 'layout/sublayout.html' %}
```

You can add macros to the `partial/macro_base.html` file and import them into `src/index.html` as normal:
```jinja
{%- import "partial/macro_base.html" as base with context %}
```
Calling the macro:
```jinja
{{ base.spacer(25) }}
```
**Note:** Use the "with context" option on import to access the global scope for environment variables such as env.language.short_name and env.content_type.

## Adding and using body copy

Body copy data is passed through this method:
```js
// Code can be found in the 'build.js' file
const html = Nunjucks.compile(_HTML, env).render({
  copy: localCopy,
  env: {
    language: {
      short_name: langName,
      content_type: 'email'
    }
  }
})

// freemarker data | NOTE: FREEMARKER IS NOT INCLUDED FOR THIS VERSION
fm.render(nj, { Country: 'US' }, (err, result) => {});
```
The copy var object is parsed from the yaml file `copy/en-us.yml` and passed to `src/index.html` as 'copy'. So for example if your yaml file looks like this:
```yaml
# My email name
from: 'Test <noreply@gmail.com>'
subject: 'This is a subject line'
headline: 'This is a headline'
subhead: 'This is a subhead'
cta: 'Call to action'
```
You would call each copy like this:
```shell
{{ copy.from }}
{{ copy.subject }}
{{ copy.headline }}
{{ copy.subhead }}
{{ copy.cta }}
```

## Dev commands (npm scripts)

|    Prefix      |    Command    | Description  |
| ----------- | ------------- | ------------ |
| npm         | `install`     | Installs project dependencies |
| npm&nbsp;run     | `dev`         | Watches for file changes in development HTML and LESS files and runs `npm run build` on save |
| npm run     | `build`       | Manually run the gulp tasks 'build-html' and 'build-pt' and 'compile'  |
| npm run     | `compile`     | Compiles final HTML data  |
| npm run     | `export`      | Creates a zip archive for upload |
| gulp        | `export`      | Alternative for `npm run export` |


# DOCS WIP...
