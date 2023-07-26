function displayCountRecipes(data) {
    
    const countRecipes = document.getElementById('count-recipes');
    const noResult = document.getElementById('no-result');
    countRecipes.innerHTML = '';
    noResult.innerHTML = '';
    countRecipes.innerHTML = `${data.length} recettes`;

    if (data.length === 0) {
        noResult.innerHTML = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.';
    }
}

export { displayCountRecipes };