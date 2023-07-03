import { displayRecipes, displayTag } from './app.js';
import { createDropdownsElements } from './createDropdownsElements.js';
import { getUniqueElementsForDropdownList } from './getUniqueElementsDropdowns.js';


function searchRecipesFromMainInputSearch (data) {
   const mainInputSearch = document.getElementById('main-search');
    console.log(mainInputSearch);

        
    mainInputSearch.addEventListener("input", function() {
        
        const inputValue = mainInputSearch.value.toLowerCase();
        console.log(inputValue);
       const filteredRecipes = data.filter((recipe) => {
            if (recipe.name.toLowerCase().includes(inputValue)) { 
                return recipe;
            }
            if (recipe.description.toLowerCase().includes(inputValue)) {
                return recipe;
            }
            if (recipe.ingredients.find((ingredient) => ingredient.ingredient.toLowerCase().includes(inputValue))) {
                return recipe;
            }
            if (recipe.appliance.toLowerCase().includes(inputValue)) {
                return recipe;
            }
            if (recipe.ustensils.find((ustensil) => ustensil.toLowerCase().includes(inputValue))) {
                return recipe;
            }
       
        });
        displayRecipes(filteredRecipes);

        createDropdownsElements(getUniqueElementsForDropdownList(filteredRecipes));
        // console.log(getUniqueElementsForDropdownList(filteredRecipes));
        
    });

}

export { searchRecipesFromMainInputSearch };



    
   