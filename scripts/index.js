// Récupération des données depuis le fichier JSON
async function getRecipes() {
    const reponse = await fetch("../data/recipes.json");
    const data = await reponse.json();
    // console.log(data);
    const { recipes } = data;

    // Affichage des recettes
    const recipesContainer = document.getElementById("recipes-container");
    
    recipes.forEach((recipe) => {
        const recipeCard = document.createElement("div");
        console.log(recipeCard.length)
        recipeCard.classList.add("recipe-card","col-6","col-md-4","col-lg-3","col-xl-3","mx-3","my-3");
        recipeCard.innerHTML = `
        <div style="height: 581px;" class=" card-header my-2 mx-2 shadow rounded-4 bg-white text-dark recipe-card__container overflow-hidden">
            <div class="image-container position-relative">
                <img class="card-img-top object-fit-cover" style="height:253px; rounded-top  overflow-hidden" src="./assets/images/${recipe.image}" alt="${recipe.name} style="height:280px;">
                <p class="recipe-card__time position-absolute top-0 end-0 px-3 m-3 bg-warning rounded-5"> ${recipe.time}min</p>
            </div>
            <div class="card-body card-text px-3">
                <h2 class="recipe-card__title my-4">${recipe.name}</h2>
                
                <h3 class="fw-700 fs-16 text-secondary">Recettes</h3>
                <p style="height: 60px;" class="recipe-card__description col overflow-hidden">${recipe.description}</p>
                <h3 class="fw-700 fs-16 text-secondary">Ingrédients</h3>
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
    //Fonction qui va récupérer les ingrédients, les appareils, les ustensiles et les afficher dans la liste à l'interieur de la div ul dropdown-menu.
    const dropdownMenu = document.getElementById("ingredients-list");
    const dropdownMenu2 = document.getElementById("appareils-list");
    const dropdownMenu3 = document.getElementById("ustensiles-list");

function getIfilterDropdownList() {
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            const ingredientName = ingredient.ingredient;

            const ingredientItem = document.createElement("li");
            ingredientItem.classList.add("dropdown-item");
            ingredientItem.textContent = ingredientName;
            dropdownMenu.appendChild(ingredientItem);
        });
    });
    recipes.forEach((recipe) => {
        const recipeAppliance = recipe.appliance;

        const applianceItem = document.createElement("li");
        applianceItem.classList.add("dropdown-item");
        applianceItem.textContent = recipeAppliance;
        dropdownMenu2.appendChild(applianceItem);
    });
    recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            const ustensilName = ustensil;

            const ustensilItem = document.createElement("li");
            ustensilItem.classList.add("dropdown-item");
            ustensilItem.textContent = ustensilName;
            dropdownMenu3.appendChild(ustensilItem);
        });
    });
}
getIfilterDropdownList();


}

getRecipes();





// Filtre des recettes
// document.getElementById("search").addEventListener("keyup", function() {
//     const filter = document.getElementById("search").value.toUpperCase();
//     if (filter.length >= 3) {
//         filterRecipes(filter);
//     } else {
//         // Réinitialiser l'affichage des recettes si le nombre de caractères est inférieur à 3
//         resetRecipeDisplay();
//     }
// });

// function filterRecipes(filter) {
//     const recipes = document.querySelectorAll(".recipe-card");
//     recipes.forEach((recipe) => {
//         const recipeTitle = recipe.querySelector(".recipe-card__title").textContent.toUpperCase();
//         const recipeIngredients = recipe.querySelector(".recipe-card__ingredients").textContent.toUpperCase();
//         const recipeDescription = recipe.querySelector(".recipe-card__description").textContent.toUpperCase();
//         const recipeTime = recipe.querySelector(".recipe-card__time").textContent.toUpperCase();

//         if (recipeTitle.includes(filter) || recipeIngredients.includes(filter) || recipeDescription.includes(filter) || recipeTime.includes(filter)) {
//             recipe.style.display = "";
//         } else {
//             recipe.style.display = "none";
//         }
//     });
// }

// function resetRecipeDisplay() {
//     const recipes = document.querySelectorAll(".recipe-card");
//     recipes.forEach((recipe) => {
//         recipe.style.display = "";
//     });
// }


// Recherche avec une boucle for

document.getElementById("search").addEventListener("keyup", debounce(filterRecipes, 300));

let filteredRecipes = [];

function filterRecipes() {
    const filter = document.getElementById("search").value.toUpperCase();
    const recipes = document.querySelectorAll(".recipe-card");

    if (filter.length < 4) {
        resetRecipeDisplay();
        return;
    }

    if (filter.length === 4) {
        filteredRecipes = Array.from(recipes);
    }

    const matchedRecipes = [];
    const counterRecipe = document.getElementById("count-recipes");

    for (let i = 0; i < filteredRecipes.length; i++) {
        const recipe = filteredRecipes[i];
        const recipeTitle = recipe.querySelector(".recipe-card__title").textContent.toUpperCase();
        const recipeIngredients = recipe.querySelector(".recipe-card__ingredients").textContent.toUpperCase();
        const recipeDescription = recipe.querySelector(".recipe-card__description").textContent.toUpperCase();
        const recipeTime = recipe.querySelector(".recipe-card__time").textContent.toUpperCase();

        if (recipeTitle.includes(filter) || recipeIngredients.includes(filter) || recipeDescription.includes(filter) || recipeTime.includes(filter)) {
            matchedRecipes.push(recipe);
            recipe.style.display = "";

        } else {
            recipe.style.display = "none";
        }
    }

    filteredRecipes = matchedRecipes;
   

}

function resetRecipeDisplay() {
    const recipes = document.querySelectorAll(".recipe-card");
    let counterRecipe = document.getElementById("count-recipes");
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        recipe.style.display = "";
    }
}

function debounce(func, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(func, delay);
    };
    
}












