import { capitalize } from "./capitalize.js";
import { displayTag } from "./app.js";
import { displayRecipes } from './displayRecipes.js';
import { searchRecipesFromMainInputSearch } from "./searchRecipesFromMainInputSearch.js";
import { getUniqueElementsForDropdownList } from "./getUniqueElementsDropdowns.js";




function createDropdownsElements(uniqueElements, dataRecipes) {
    const dropdownMenu = document.getElementById("ingredients-list");
    const dropdownMenu2 = document.getElementById("appareils-list");
    const dropdownMenu3 = document.getElementById("ustensiles-list");
    // const mainSearchInput = document.getElementById("main-search");
    

    dropdownMenu.innerHTML = "";
    dropdownMenu2.innerHTML = "";
    dropdownMenu3.innerHTML = "";
   
     uniqueElements.ingredients.forEach((ingredientName) => {
       const ingredientItem = document.createElement("li");
       ingredientItem.classList.add("dropdown-item");
       ingredientItem.textContent = capitalize(ingredientName);
       dropdownMenu.appendChild(ingredientItem);
      //  console.log(ingredientName);
      
      
       ingredientItem.addEventListener("click", function () {
        
        displayTag(ingredientName);
       searchRecipeByTags(ingredientName, dataRecipes);
       const getFilteredResultsIngredients = searchRecipeByTags(ingredientName, dataRecipes);
       searchRecipeByTags(ingredientName, getFilteredResultsIngredients );
        console.log(getFilteredResultsIngredients);
  
       });
     });

   
     uniqueElements.appliances.forEach((recipeAppliance) => {
       const applianceItem = document.createElement("li");
       applianceItem.classList.add("dropdown-item");
       applianceItem.textContent = capitalize(recipeAppliance);
       dropdownMenu2.appendChild(applianceItem);
   
       applianceItem.addEventListener("click", function () {
        displayTag(recipeAppliance);
        const getFilteredResultsAppliance = searchRecipeByTags(recipeAppliance, dataRecipes);
        searchRecipeByTags(recipeAppliance, getFilteredResultsAppliance);
 
       });
     });
   
     uniqueElements.ustensils.forEach((ustensilName) => {
       const ustensilItem = document.createElement("li");
       ustensilItem.classList.add("dropdown-item");
       ustensilItem.textContent = capitalize(ustensilName);
       dropdownMenu3.appendChild(ustensilItem);
   
       ustensilItem.addEventListener("click", function () {
        displayTag(ustensilName);
        const getFilteredResultsUstensils = searchRecipeByTags(ustensilName, dataRecipes);
        searchRecipeByTags(ustensilName, getFilteredResultsUstensils);
    
       });
     });
     
     capitalize(uniqueElements)
     
}

export { createDropdownsElements };


export function searchRecipeByTags (uniqueElements, dataRecipes) {
   
      const filteredRecipes = dataRecipes.filter((recipe) => {
            if (recipe.name.toLowerCase().includes(uniqueElements)) { 
                return recipe;
            }
            if (recipe.description.toLowerCase().includes(uniqueElements)) {
                return recipe;
            }
            if (recipe.ingredients.find((ingredient) => ingredient.ingredient.toLowerCase().includes(uniqueElements))) {
                return recipe;
            }
            if (recipe.appliance.toLowerCase().includes(uniqueElements)) {
                return recipe;
            }
            if (recipe.ustensils.find((ustensil) => ustensil.toLowerCase().includes(uniqueElements))) {
                return recipe;
            }
       
        });
        displayRecipes(filteredRecipes);
        createDropdownsElements(getUniqueElementsForDropdownList(filteredRecipes), dataRecipes);
        searchRecipesFromMainInputSearch(filteredRecipes, dataRecipes);

        console.log(filteredRecipes);

        return filteredRecipes;

        
      }

// const getFilteredRecipes = searchRecipeByTags(uniqueElements, dataRecipes);
// console.log(getFilteredRecipes);