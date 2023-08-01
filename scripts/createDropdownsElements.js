import { capitalize } from "./capitalize.js";
import { mainSearch2 } from './mainSearch2.js';
import { displayRecipes } from './displayRecipes.js';
import { getUniqueElementsForDropdownList } from "./getUniqueElementsDropdowns.js";
// import { displayCountRecipes } from "./displayCountRecipes.js";



function displayTag(text, dropdownName) {
  const mainSearchInput = document.getElementById("main-search");
  const searchInputs = document.querySelectorAll(".search-input");
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  const tagDisplay = document.getElementById("tag-display");
  const tag = document.createElement("div");
  tag.classList.add("tag", dropdownName);
  tag.textContent = capitalize(text);
  tag.dataset.value = text;
  const counterRecipe = document.getElementById("counter-recipe");

  //   mainSearchInput.value = tag.textContent;

    searchInputs.forEach((searchInput) => {//ici
        searchInput.value = "";
    });

    dropdownItems.forEach((dropdownItem) => {
        dropdownItem.style.display = "";
    });

  
  

  const closeIcon = document.createElement("span");
  closeIcon.classList.add("close-icon");
  closeIcon.innerHTML = "&#x2716;";
  tag.appendChild(closeIcon);
  tagDisplay.appendChild(tag);


  closeIcon.addEventListener('click', function() {
    tagDisplay.removeChild(tag);
  
  mainSearch2();

  });
}


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
      
      
      
       ingredientItem.addEventListener("click", function () {
        displayTag(ingredientName, "ingredient");
        mainSearch2();
        
  
       });
     });

   
     uniqueElements.appliances.forEach((recipeAppliance) => {
       const applianceItem = document.createElement("li");
       applianceItem.classList.add("dropdown-item");
       applianceItem.textContent = capitalize(recipeAppliance);
       dropdownMenu2.appendChild(applianceItem);
   
       applianceItem.addEventListener("click", function () {
        displayTag(recipeAppliance, "appliance");
        mainSearch2();
 
       });
     });
   
     uniqueElements.ustensils.forEach((ustensilName) => {
       const ustensilItem = document.createElement("li");
       ustensilItem.classList.add("dropdown-item");
       ustensilItem.textContent = capitalize(ustensilName);
       dropdownMenu3.appendChild(ustensilItem);
   
       ustensilItem.addEventListener("click", function () {
        displayTag(ustensilName, "ustensil");
        mainSearch2();
       });
     });
     
     capitalize(uniqueElements)
     
}

export { createDropdownsElements };

