# Eleventy-plugin-cooklang

An Eleventy extension that adds support for `.cook` files. Reads the `.cook` file and adds data to the page. Choice of how to display that data is left up to the user, i.e. create your own layout to display it.

## Installation

```bash
# Add to your project
npm i eleventy-plugin-cooklang
```

```js
// Inside your .eleventy.js
const eleventyPluginCookLang = require('eleventy-plugin-cooklang');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyPluginCookLang);
};
```

## Options

So far there is only one configuration option for the plugin, to configure just pass in an object with the desired options configured.

### outputHtml

Takes a boolean and changes whether the insructions are output as plain text or as `<span>` tags with a class of `recipe--${type}` where type can be `ingredient`, `cookware`, `timer`, or `text`.

Useful for if you want to style the instructions.

```js
// Inside your .eleventy.js
const eleventyPluginCookLang = require('eleventy-plugin-cooklang');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyPluginCookLang, {
    outputHtml: true / false,
  });
};
```

## Credit

Powered by [cooklang/ts-parser](https://github.com/cooklang/cooklang-ts) under the hood.

## License

[MIT License](https://opensource.org/licenses/MIT)
