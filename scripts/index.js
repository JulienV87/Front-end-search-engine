// Récupération des données depuis le fichier JSON
async function getRecipes() {
    const reponse = await fetch("../data/recipes.json");
    const data = await reponse.json();
    // console.log(data);
    const { recipes } = data;
    console.log(recipes);



    // Affichage des recettes
    const recipesContainer = document.getElementById("recipes-container");
    console.log(recipesContainer);
    recipes.forEach((recipe) => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");
        recipeCard.innerHTML = `
            <div class="recipe-card__img>
          <img class="card-img-top --bs-tertiary-color" alt="${recipe.name}">

            </div>
            <div class="recipe-card__content row bg-secondary-subtle mb-3">
            <div class="recipe-card__content__header d-flex justify-content-between">
                <h2 class="recipe-card__title">${recipe.name}</h2>
                <p class="recipe-card__time"><img src="./assets/timer.svg" alt="icone temps de preparation"> ${recipe.time} min</p>
            </div>
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
                <p class="recipe-card__description col">${recipe.description}</p>
            </div>
        `;
        recipesContainer.appendChild(recipeCard);
        
    }
    );
}

getRecipes();




