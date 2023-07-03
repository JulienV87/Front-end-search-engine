import { capitalize } from "./capitalize.js";
import { displayTag } from "./app.js";
import { searchRecipesFromMainInputSearch } from "./searchRecipesFromMainInputSearch.js";
import { dataRecipes } from "./app.js";




function createDropdownsElements(uniqueElements) {
    const dropdownMenu = document.getElementById("ingredients-list");
    const dropdownMenu2 = document.getElementById("appareils-list");
    const dropdownMenu3 = document.getElementById("ustensiles-list");
    

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
    
       });
     });
     
     capitalize(uniqueElements)

    }

    export { createDropdownsElements };
    
