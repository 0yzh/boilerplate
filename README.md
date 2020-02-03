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
  ![alt text](https://lh3.googleusercontent.com/oG_QD7xeR_CKSPryCZR4QaWVlm-4d19jHphzlGlb6aEHUMu8jjgQtE-kbCOFcrL6HY0r89XYegFBFVDQAXQ-fLqpVDS5MlKiGzAQgO4V5-Gz4eGP3hcJwVvtM0FNZbwGcDLTc-l3MCmFEo-BgZCIqEx09LFMgjFUoZf4VYOyOe5kl_HcOZWXxi85Yger0M3XyrQCen5uxQTFjGDEwHwVwq-ycRfzqhovcXFhcTA-X-khVGIMwDZgN3ExOME2RJxxhM34E7ih9fMzRdOqC0GqCn30G483FC1FfKDrOjv2l3xCQTFgqoMTd5KnSOSF4AV9hklKXhNnFFuPHiAoOdMmMXTHka3efSYo-YZw-pHnmPMRId_lUWG0JwvrcrdrgqZnATCiQAKNB98-ja2mKt0x7AV-YcQtSv6tUjz_GM926-Nup9EnMQP5_duSBFTePGEJQ6UZiDYc4W6Jvd1kdyXa0dqAOMfutsaQCHg3qqAw3lhAzUd7k-vIRhIim5ZAlDT0t6cadyOYNT655FSSPee0v4yDO51AkcN3DIV5bDaOHzGeD1CQs-5szMlmVIdwTlrtK_qi45RFIL4hi-h9L-WdHKGBp5y7cNTHtCX4F7uzA1sSItYGzSiV6_D_1dWjl0Kdqy85nme8VMWoLUig9kjSCKZIiv7vQ5laK3zppuhhIi7I01aq5zDSlFE=w1135-h986-no 'base layout')

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
