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
    const recipe = new Recipe(content.substring(charsToTrim));

    let steps = [];
    let ingredients = [];
    let cookware = [];
    const recipeTags = recipe?.metadata?.tags?.split(',') || [];

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

        if (token.type == 'timer') {
          const { quantity, units } = token;
          steps[i].push(`<span class="recipe--${token.type}">${quantity} ${units}</span>`);
        } else {
          steps[i].push(`<span class="recipe--${token.type}">${token.name || token.value}</span>`);
        }
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
