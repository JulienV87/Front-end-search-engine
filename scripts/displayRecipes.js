import { displayCountRecipes } from "./displayCountRecipes.js";

function displayRecipes(dataRecipes) {
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

export { displayRecipes };