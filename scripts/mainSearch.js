import { createDropdownsElements } from './createDropdownsElements.js';
import recipes from './dataRecipes.js';
import { displayRecipes } from './displayRecipes.js';
import { displayCountRecipes } from './displayCountRecipes.js';
import { getUniqueElementsForDropdownList } from './getUniqueElementsDropdowns.js';

function matchKeywordsInRecipeTextFields(recipe, keywords) {
    let result = false;
    if (recipe.name.toLowerCase().includes(keywords)) {
        result = true;
    }
    else if (recipe.description.toLowerCase().includes(keywords)) {
        result = true;
    }
    else if (recipe.ingredients.find((ingredient) => ingredient.ingredient.toLowerCase().includes(keywords))) {
        result = true;
    }
    else if (recipe.appliance.toLowerCase().includes(keywords)) {
        result = true;
    }
    else if (recipe.ustensils.find((ustensil) => ustensil.toLowerCase().includes(keywords))) {
        result = true;
    }
    return result;
}

function isKeywordsOk(recipe, keywords) {
    let result = false;
    if (keywords.length == 0) {
        result = true;
    } else {
        result = matchKeywordsInRecipeTextFields(recipe, keywords)
    }
    return result;
}

function isIngredientOk(recipe, ingredients) {
    let result = true;
    const recipeIngredientNames = [];
    recipe.ingredients.forEach((ingredient) => {
        recipeIngredientNames.push(ingredient.ingredient);
    });
    ingredients.forEach((ingredient) => {
        if (!recipeIngredientNames.includes(ingredient)) {
            result = false;
        }
    });
    return result;
}

function isApplianceOk(recipe, appliances) {
    let result = true;
    const recipeApplianceNames = [];
    recipeApplianceNames.push(recipe.appliance);
    appliances.forEach((appliance) => {
        if (!recipeApplianceNames.includes(appliance)) {
            result = false;
        }
    });
    return result;
}

function isUstensilOk(recipe, ustensils) {
    let result = true;
    const recipeUstensilNames = [];
    recipe.ustensils.forEach((ustensil) => {
        recipeUstensilNames.push(ustensil);
    });
    ustensils.forEach((ustensil) => {
        if (!recipeUstensilNames.includes(ustensil)) {
            result = false;
        }
    });
    return result;
}


function mainSearch() {
    const allRecipies = recipes;  // simule un appel vers le serveur
    console.log("mainSearch");
    let keywords;
    const ingredients = [];
    const appliances = [];
    const ustensils = [];


    const mainInputSearch = document.getElementById('main-search');
    keywords = mainInputSearch.value.toLowerCase().trim();

    const ingredientTags = document.querySelectorAll(".tag.ingredient");
    ingredientTags.forEach(ingredientTag => {
        ingredients.push(ingredientTag.dataset.value);
    });
    console.log(ingredients)

    const applianceTags = document.querySelectorAll(".tag.appliance");
    applianceTags.forEach(applianceTag => {
        appliances.push(applianceTag.dataset.value);
    });
    console.log(appliances)

    const ustensilTags = document.querySelectorAll(".tag.ustensil");
    ustensilTags.forEach(ustensilTag => {
        ustensils.push(ustensilTag.dataset.value);
    });
    console.log(ustensils)


    const filteredRecipes = allRecipies.filter((recipe) => {
        let keywordsOk = isKeywordsOk(recipe, keywords);
        let ingredientOk = isIngredientOk(recipe, ingredients);
        let applianceOk = isApplianceOk(recipe, appliances);
        let ustensilOk = isUstensilOk(recipe, ustensils);

        if (keywordsOk && ingredientOk && applianceOk && ustensilOk) {
            return recipe;
        }
    }
    );
    displayRecipes(filteredRecipes); // afficher les recettes de la sous liste 
    const uniqueElementsForDropdownList = getUniqueElementsForDropdownList(filteredRecipes)
    console.log("here1");
    createDropdownsElements(uniqueElementsForDropdownList, filteredRecipes);// afficher les ingridients restants dans la dropdown
    displayCountRecipes(filteredRecipes); // afficher le nombre des recettes dans la sous liste
  
    console.log(filteredRecipes);

    return filteredRecipes;

}

export { mainSearch };