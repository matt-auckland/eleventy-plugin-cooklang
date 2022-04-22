# Eleventy-plugin-cooklang

An Eleventy extension that adds support for `.cook` files. Reads the `.cook` file and adds data to the page. Choice of how to display that data is left up to the user, i.e. create your own layout to display it. Any frontmatter added to the `.cook` file is before we parse the recipe but will be still be included in the page's data.

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

## Output

The plugin adds the following to the page's data:

```js
{
  recipe, // The raw output of the cooklang parser
  steps, // An array of the recipe's steps
  ingredients, // An array of the recipe's ingredients
  cookware, // An array of the recipe's cookware
  recipeTags; // An array of any tags added as Cooklang metadata to the recipe, i.e. >> tags: bread, baking
}
```

The `content` of the page is the raw content of the `.cook` file, if you set the `excludeContent` option this will be an empty string.

## Options

To configure just pass in an object with the desired options configured.

```js
// Inside your .eleventy.js
const eleventyPluginCookLang = require('eleventy-plugin-cooklang');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyPluginCookLang, {
    outputHtml: true / false, // default false
    excludeContent: true / false, // default false
  });
};
```

### outputHtml

Default: `false`

Takes a boolean and changes whether the insructions are output as plain text or as `<span>` tags with a class of `recipe--${type}` where type can be `ingredient`, `cookware`, `timer`, or `text`.

Useful for if you want to style the instructions.

### excludeContent

Default: `false`

Takes a boolean and changes whether the page has `content` or not, can be useful for your display logic.

## Credit

Powered by [cooklang/ts-parser](https://github.com/cooklang/cooklang-ts) under the hood.

## License

[MIT License](https://opensource.org/licenses/MIT)
