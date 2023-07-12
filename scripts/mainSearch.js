import recipes from './dataRecipes.js';

const allRecipies = recipes;


function mainSearch(allRecipies) {
    console.log("mainSearch");
    let keywords;
    const ingredients = [];

    // recuperer toutes les recettes existantes parmis lesquels nous allons chercher -> fait
    // recuperer les mots clés -> condition de recherche -> fait
    // recuperer les ingridients -> condition de recherche -> fait
    // recuperer les appareils -> condition de recherche
    // recuperer les ustensils -> condition de recherche
    // obtenir une sous liste des recettes à partir de toutes les recettes et conditions de recherche
    // afficher les recettes de la sous liste
    // afficher les ingridients restants dans la dropdown
    // afficher les appareils restants dans la dropdown
    // afficher les ustensils restants dans la dropdown
    // afficher le nombre des recettes dans la sous liste -> "counter"
    const mainInputSearch = document.getElementById('main-search');
    keywords = mainInputSearch.value.toLowerCase();
    const ingredientTags = document.querySelectorAll(".tag.ingredient");
    ingredientTags.forEach(ingredientTag => {
        ingredients.push(ingredientTag.dataset.value);
    });
    console.log(ingredients)
}

export { mainSearch };