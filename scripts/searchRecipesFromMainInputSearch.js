import { displayRecipes } from './displayRecipes.js';
import { createDropdownsElements } from './createDropdownsElements.js';
import { getUniqueElementsForDropdownList } from './getUniqueElementsDropdowns.js';



function searchRecipesFromMainInputSearch (someRecipes, dataRecipes) {
   const mainInputSearch = document.getElementById('main-search');
    
    const inputValue = mainInputSearch.value.toLowerCase();
    
    const filteredRecipes = someRecipes.filter((recipe) => {
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
        console.log("*********nouvelle recherche ici**********")
        filteredRecipes.forEach((recipe) => {
            console.log(recipe.ustensils);
        });


        // createDropdownsElements(getUniqueElementsForDropdownList(filteredRecipes), dataRecipes);
        
        


}

export { searchRecipesFromMainInputSearch };


 

