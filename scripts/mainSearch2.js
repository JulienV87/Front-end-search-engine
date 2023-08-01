import recipes from './dataRecipes.js';
import { createDropdownsElements } from './createDropdownsElements.js';
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
        recipeIngredientNames.push(ingredient.ingredient.toLowerCase());
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
    recipeApplianceNames.push(recipe.appliance.toLowerCase());
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
        recipeUstensilNames.push(ustensil.toLowerCase());
    });
    ustensils.forEach((ustensil) => {
        if (!recipeUstensilNames.includes(ustensil)) {
            result = false;
        }
    });
    return result;
}


function mainSearch2() {
    const allRecipies = recipes;  // simule un appel vers le serveur
    
    let keywords;
    const ingredients = [];
    const appliances = [];
    const ustensils = [];

    const mainInputSearch = document.getElementById('main-search');
    keywords = mainInputSearch.value.toLowerCase().trim();

    const ingredientTags = document.querySelectorAll(".tag.ingredient");
    for (let i = 0; i < ingredientTags.length; i++) {
        ingredients.push(ingredientTags[i].dataset.value);
    }

    const applianceTags = document.querySelectorAll(".tag.appliance");
    for (let i = 0; i < applianceTags.length; i++) {
        appliances.push(applianceTags[i].dataset.value);
    }

    const ustensilTags = document.querySelectorAll(".tag.ustensil");
    for (let i = 0; i < ustensilTags.length; i++) {
        ustensils.push(ustensilTags[i].dataset.value);
    }

    const filteredRecipes = [];
    for (let i = 0; i < allRecipies.length; i++) {
        const recipe = allRecipies[i];
        let keywordsOk = isKeywordsOk(recipe, keywords);
        let ingredientOk = isIngredientOk(recipe, ingredients);
        let applianceOk = isApplianceOk(recipe, appliances);
        let ustensilOk = isUstensilOk(recipe, ustensils);
    
        if (keywordsOk && ingredientOk && applianceOk && ustensilOk) {
            filteredRecipes.push(recipe);
        }
    }
    

    displayRecipes(filteredRecipes); // afficher les recettes de la sous liste 
    const uniqueElementsForDropdownList = getUniqueElementsForDropdownList(filteredRecipes)
    
    createDropdownsElements(uniqueElementsForDropdownList, filteredRecipes); // afficher les ingridients restants dans la dropdown
    displayCountRecipes(filteredRecipes); // afficher le nombre des recettes dans la sous liste
}

function initSearchFromSearchBar() {
    const mainInputSearch = document.getElementById('main-search');
    mainInputSearch.addEventListener("search", function(event) {
        mainSearch2();
    });
    mainInputSearch.addEventListener("keyup", function(event) {
        const keywords = mainInputSearch.value.toLowerCase().trim();
        if (  // keys to ignore
                    event.key === "ArrowRight"
                ||
                    event.key === "ArrowLeft"
                ||
                    event.key === "ArrowUp"
                ||
                    event.key === "ArrowDown"
                ||
                    event.key === "End"
                ||
                    event.key === "Home"
                ||
                    event.key === "PageUp"
                ||
                    event.key === "PageDown"
                ||
                    event.key === "Shift"
                ||
                    event.key === "Control"
                ||
                    event.key === "Alt"
                ||
                    event.key === "AltGraph"
                ||
                    event.key === "CapsLock"
                ||
                    event.key === "Meta"
                ||
                    event.key == "Enter"  // cas deja couvert par evenement search
            ) {
                // avoid reloading if user navigates search input
            } else if (event.key == "Space") {
                mainSearch2();
            } else if (keywords.length > 2) {
                mainSearch2();
            }
    });
}

export { mainSearch2, initSearchFromSearchBar };