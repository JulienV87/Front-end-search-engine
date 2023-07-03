function getUniqueElementsForDropdownList(data){
  const uniqueIngredients = new Set();
  const uniqueAppliances = new Set();
  const uniqueUstensils = new Set();

  data.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
          const ingredientName = ingredient.ingredient.toLowerCase();
          uniqueIngredients.add(ingredientName);
      });

      const recipeAppliance = recipe.appliance.toLowerCase();
      uniqueAppliances.add(recipeAppliance);

      recipe.ustensils.forEach((ustensil) => {
          const ustensilName = ustensil.toLowerCase();
          uniqueUstensils.add(ustensilName);
      });
  });

  return {
      ingredients: Array.from(uniqueIngredients),
      appliances: Array.from(uniqueAppliances),
      ustensils: Array.from(uniqueUstensils)
  };

}

  export { getUniqueElementsForDropdownList };