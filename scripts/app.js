import recipes from './dataRecipes.js';
import { displayRecipes } from './displayRecipes.js';
import { displayCountRecipes } from './displayCountRecipes.js';
import { getUniqueElementsForDropdownList } from './getUniqueElementsDropdowns.js';
import { toggleDropdown } from './toggleDropdowns.js';
import { createDropdownsElements } from './createDropdownsElements.js';
import { searchRecipesFromMainInputSearch } from './searchRecipesFromMainInputSearch.js';
import { capitalize } from './capitalize.js';
import { filterDropdownList } from '../filterDropdownList.js';




const dataRecipes = recipes;
console.log(dataRecipes)



displayRecipes(dataRecipes); //Affichage des recettes


const uniqueElementsForDropdownList = getUniqueElementsForDropdownList(dataRecipes);//Récupération des éléments uniques pour les dropdowns

// console.log(getUniqueElementsForDropdownList(dataRecipes));

createDropdownsElements(uniqueElementsForDropdownList, dataRecipes);//Affichage des dropdowns

toggleDropdown();//Animation des dropdowns

filterDropdownList();//Filtrage des dropdowns

searchRecipesFromMainInputSearch(dataRecipes, dataRecipes);//Recherche des recettes depuis la barre de recherche principale

// console.log(searchRecipesFromMainInputSearch(dataRecipes));
 

    export function displayTag(text) {
    const mainSearchInput = document.getElementById("main-search");
    const searchInputs = document.querySelectorAll(".search-input");
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    const tagDisplay = document.getElementById("tag-display");
    const tag = document.createElement("div");
    tag.classList.add("tag");
    tag.textContent = capitalize(text);
    const counterRecipe = document.getElementById("counter-recipe");


    //   mainSearchInput.value = tag.textContent;

    
  
      searchInputs.forEach((searchInput) => {//ici
          searchInput.value = "";
      });
  
      dropdownItems.forEach((dropdownItem) => {
          dropdownItem.style.display = "";
      });
  
    
    console.log(tag.textContent); //TEST
  
    const closeIcon = document.createElement("span");
    closeIcon.classList.add("close-icon");
    closeIcon.innerHTML = "&#x2716;";
    tag.appendChild(closeIcon);
    tagDisplay.appendChild(tag);

  
    closeIcon.addEventListener('click', function() {
      tagDisplay.removeChild(tag);
      displayCountRecipes(recipes.length);
      displayRecipes(recipes);
      searchRecipesFromMainInputSearch(recipes, dataRecipes);
      createDropdownsElements(getUniqueElementsForDropdownList(dataRecipes), dataRecipes);
      mainSearchInput.value = "";

    });
  }

 

const mainSearch = document.querySelector("#main-search");
mainSearch.addEventListener("search", function(event) {
    console.log("here1");
    searchRecipesFromMainInputSearch(dataRecipes)
});
mainSearch.addEventListener("keyup", function(event) {
    console.log("here2");
    searchRecipesFromMainInputSearch(dataRecipes)
});

  


  