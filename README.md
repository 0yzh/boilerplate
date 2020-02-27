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

Next, start the npm dev script. This will monitor any changes you make to `src/index.html` and any files in `src/less/*.less` then automatically run the build process `npm run build` when changes are detected.

```shell
npm run dev
```
This puts the terminal into a 'watch' state, preventing additional terminal commands. Use Control + C to exit this mode.

## Development

You can add your development phase HTML in `index.html` located on the src folder level `boilerplate/src/index.html` file and LESS in the: `boilerplate/src/less/styles.less` file.

When you're ready to compile, simply saving changes to your `src/index.html` file should trigger a build process automatically if the npm dev script is running: `npm run dev`.

If did not start the dev script and want to manually compile your builds, run this command each time you want to build the final html: `npm run build`

Once the build process is complete there will be two new files created `src`:

- `stage` contains the compiled nunjucks and LESS->CSS files.

- `build` contains the final HTML with rendered nunjucks data and inlined CSS / -premailer styles: `boilerplate/src/build/index.html`

## Using layouts and partials

Layouts and modular components can be added to the `layout` folder.

- Base layout example:
  ![alt text](https://lh3.googleusercontent.com/0VCY1uFzXyCjROfgPxOU4UQncoGVQ-Wvnk3_PORqEjpgLfQPwj1gOCzc4edRjM5umGeiUy2JfoNeFRxtg-8B4NT7Yeq6nPuVyixBMzzDnAfycUn61uSbq59i7q3cUavmG-GYfxBfXIJkfYj8-xRMBEba12QmguTfC0LjXUqlNfxEd2u3tRQ-MiuWP6l_w61_pfV0oOhUThEoYRG6t-W6n-FTGsps81hndYGQ7OUw1DxkCUAnL-CO6b5Cew65YQ4CDu2O6aAONXrcoZSfKUbJzLKBvjXDVXG37zFEOK1MnL0e5YzUtqYbLHpSp6kd_vWvZeGqd3OTPSqnBRN4l2sU2v3FwnYxKDyCml93RCRX0eeE1JK0eJWW-ORtQtSNmkKjQdg88aYvs0vmSC7D8vV3SGC0Fjdj1bcu8QONXY0WoSTRppXBwEvk-t7gIGiEndHykfnWtzh6ll8WqQF6nXYoIErrEZEEm8376oF3H5ics0LcKxi1TgYkizYLDiHNNzX8RRbpS8fGtFj62BHE8DIRxQBK-inmzu33EZZQVCCKzC8c-TUnQIQ5fyTxizhufvWOF-ADXmMKT_ao92VJSqLMJriqssXH4CYXnI3N7yTLITZfjMuMOGqLVNwEEFK4DB_PAkuBsB2ypMsXjwylro-imq7TgrZA2DMwOxX8JnMinceJyt_w8GSngPs=w1031-h985-no)

- Sublayout example:
  ![alt text](https://lh3.googleusercontent.com/oG_QD7xeR_CKSPryCZR4QaWVlm-4d19jHphzlGlb6aEHUMu8jjgQtE-kbCOFcrL6HY0r89XYegFBFVDQAXQ-fLqpVDS5MlKiGzAQgO4V5-Gz4eGP3hcJwVvtM0FNZbwGcDLTc-l3MCmFEo-BgZCIqEx09LFMgjFUoZf4VYOyOe5kl_HcOZWXxi85Yger0M3XyrQCen5uxQTFjGDEwHwVwq-ycRfzqhovcXFhcTA-X-khVGIMwDZgN3ExOME2RJxxhM34E7ih9fMzRdOqC0GqCn30G483FC1FfKDrOjv2l3xCQTFgqoMTd5KnSOSF4AV9hklKXhNnFFuPHiAoOdMmMXTHka3efSYo-YZw-pHnmPMRId_lUWG0JwvrcrdrgqZnATCiQAKNB98-ja2mKt0x7AV-YcQtSv6tUjz_GM926-Nup9EnMQP5_duSBFTePGEJQ6UZiDYc4W6Jvd1kdyXa0dqAOMfutsaQCHg3qqAw3lhAzUd7k-vIRhIim5ZAlDT0t6cadyOYNT655FSSPee0v4yDO51AkcN3DIV5bDaOHzGeD1CQs-5szMlmVIdwTlrtK_qi45RFIL4hi-h9L-WdHKGBp5y7cNTHtCX4F7uzA1sSItYGzSiV6_D_1dWjl0Kdqy85nme8VMWoLUig9kjSCKZIiv7vQ5laK3zppuhhIi7I01aq5zDSlFE=w1135-h986-no 'base layout')

- You can add macros to the `partial` folder and import into `src/index.html` as normal:
  ```jinja
    {% import "src/partial/macro_base" as base %}
  ```

## Data

- Data is passed through this method:

```js
// Code can be found in the 'build.js' file
// jinja data
const htmlString = nunjucks.render('index.html', { n: 1 });

// freemarker data | NOTE: FREEMARKER IS NOT INCLUDED FOR THIS VERSION
fm.render(nj, { Country: 'US' }, (err, result) => {});
```

# WIP...
