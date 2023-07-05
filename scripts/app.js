import recipes from './dataRecipes.js';
import { displayCountRecipes } from './displayCountRecipes.js';
import { getUniqueElementsForDropdownList } from './getUniqueElementsDropdowns.js';
import { toggleDropdown } from './toggleDropdowns.js';
import { createDropdownsElements } from './createDropdownsElements.js';
import { searchRecipesFromMainInputSearch } from './searchRecipesFromMainInputSearch.js';
import { capitalize } from './capitalize.js';
import { filterDropdownList } from '../filterDropdownList.js';




export const dataRecipes = recipes;
console.log(dataRecipes)


export function displayRecipes(dataRecipes) {
    const recipesContainer = document.getElementById('recipes-container');
    recipesContainer.innerHTML = '';
    dataRecipes.forEach((recipe) => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add("recipe-card","col-8","col-sm-6","col-md-4","mx-","my-3");
        recipeCard.innerHTML = `
        <div style="height: 565px;" class=" card-header my-2 mx-3 shadow rounded-4 bg-white text-dark recipe-card__container overflow-hidden">
            <div class="image-container position-relative">
                <img class="card-img-top object-fit-cover" style="height:253px; rounded-top  overflow-hidden" src="./assets/images/${recipe.image}" alt="${recipe.name} style="height:280px;">
                <p class="recipe-card__time position-absolute top-0 end-0 px-3 m-3 bg-warning rounded-5"> ${recipe.time}min</p>
            </div>
            <div class="card-body card-text px-3">
                <h2 class="recipe-card__title">${recipe.name}</h2>
                
                <h3 class="h3-title">Recettes</h3>
                <p style="height: 60px;" class="recipe-card__description col overflow-hidden">${recipe.description}</p>
                <h3 class="h3-title">Ingrédients</h3>
                <ul class="recipe-card__ingredients col list-unstyled">
                    ${recipe.ingredients
                        .map((ingredient) => {
                            if (ingredient.quantity === undefined) {
                                return `<li>${ingredient.ingredient}</li>`;
                            }
                            if (ingredient.unit === undefined) {
                                ingredient.unit = "";
                            }
                            return `<li>${ingredient.ingredient} : ${ingredient.quantity} ${ingredient.unit}</li>`;
                        })
                        .join("")}
                </ul>
            </div>
        </div>
        `; 
        recipesContainer.appendChild(recipeCard);
    }
    );
    displayCountRecipes(dataRecipes);
}

displayRecipes(dataRecipes); //Affichage des recettes


getUniqueElementsForDropdownList(dataRecipes);//Récupération des éléments uniques pour les dropdowns

// console.log(getUniqueElementsForDropdownList(dataRecipes));

createDropdownsElements(getUniqueElementsForDropdownList(dataRecipes));//Affichage des dropdowns

toggleDropdown();//Animation des dropdowns

filterDropdownList();//Filtrage des dropdowns

searchRecipesFromMainInputSearch(dataRecipes);//Recherche des recettes depuis la barre de recherche principale

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

    //   mainSearchInput.value = "";
  
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

    });
  }

  

  


  


  