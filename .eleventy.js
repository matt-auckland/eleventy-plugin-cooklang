const { Recipe } = require("@cooklang/cooklang-ts");
const fs = require('fs');

const frontmatterRegex = /^(\-\-\-\n)(.*\n)*(\-\-\-)$/gm

module.exports = function (eleventyConfig, config) {
  eleventyConfig.addTemplateFormats("cook");
  eleventyConfig.addExtension("cook", cookExtension);
}


const cookExtension = {
  getData: async function (inputPath) {

    const content = fs.readFileSync(inputPath, 'utf-8');
    const charsToTrim = content.match(frontmatterRegex)[0].length;
    // Trim out frontmatter and parse recipe using cooklang-ts
    const recipe = new Recipe(content.substring(charsToTrim));

    let steps = [];
    let ingredients = [];
    let cookware = [];
    const recipeTags = recipe?.metadata?.tags?.split(',') || [];

    function getStepTokenHTML(token) {
      const { quantity, units, name, value, type } = token;
      let tagContent = "";

      if (token.type == 'timer') {
        tagContent = `${quantity} ${units}`;
      } else {
        tagContent = token.name || token.value;
      }
      return `<span class="recipe--${type}">${tagContent}</span>`;
    }

    recipe.steps.forEach((stepTokens, i) => {
      if (!steps[i]) steps[i] = [];

      return stepTokens.forEach(token => {
        if (token.type == 'ingredient') {
          const { name, quantity, units } = token
          ingredients.push({ name, quantity, units })
        }

        if (token.type == 'cookware') {
          const { name } = token
          cookware.push({ name })
        }

        steps[i].push(getStepTokenHTML(token));
      });
    });


    return {
      recipe,
      steps,
      ingredients,
      cookware, recipeTags
    };
  },
  compile: async (inputContent) => {
    // We probably don't need the raw content but it's here if we want
    return async () => {
      return inputContent;
    };
  }
}
