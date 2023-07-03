function displayCountRecipes(data) {
    const countRecipes = document.getElementById('count-recipes');
    countRecipes.innerHTML = '';
    countRecipes.innerHTML = `${data.length} recettes`;
}

export { displayCountRecipes };