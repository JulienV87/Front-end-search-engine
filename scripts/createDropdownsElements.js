import { capitalize } from "./capitalize.js";
import { displayRecipes, displayTag } from "./app.js";
import { searchRecipesFromMainInputSearch } from "./searchRecipesFromMainInputSearch.js";
import { dataRecipes } from "./app.js";
import { getUniqueElementsForDropdownList } from "./getUniqueElementsDropdowns.js";




function createDropdownsElements(uniqueElements) {
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
   
       ingredientItem.addEventListener("click", function () {
        displayTag(ingredientName);
        console.log(displayTag(ingredientName));
        // searchRecipeByTags(ingredientName);
        console.log(searchRecipeByTags(ingredientName));
        
      
       });
     });
   
     uniqueElements.appliances.forEach((recipeAppliance) => {
       const applianceItem = document.createElement("li");
       applianceItem.classList.add("dropdown-item");
       applianceItem.textContent = capitalize(recipeAppliance);
       dropdownMenu2.appendChild(applianceItem);
   
       applianceItem.addEventListener("click", function () {
        displayTag(recipeAppliance);
 
       });
     });
   
     uniqueElements.ustensils.forEach((ustensilName) => {
       const ustensilItem = document.createElement("li");
       ustensilItem.classList.add("dropdown-item");
       ustensilItem.textContent = capitalize(ustensilName);
       dropdownMenu3.appendChild(ustensilItem);
   
       ustensilItem.addEventListener("click", function () {
        displayTag(ustensilName);
        searchRecipeByTags(ustensilName);
    
       });
     });
     
     capitalize(uniqueElements)

    }

    export { createDropdownsElements };
    
    function searchRecipeByTags (uniqueElements) {

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
        createDropdownsElements(getUniqueElementsForDropdownList(filteredRecipes));
        // searchRecipesFromMainInputSearch(filteredRecipes);
        console.log(filteredRecipes);
    }
        