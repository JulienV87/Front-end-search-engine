

// Récupération des données depuis le fichier JSON
async function getRecipesOnDemand() {
    const reponse = await fetch("../data/recipes.json");
    const data = await reponse.json();

    var { recipes } = data;

    return recipes;
}


async function getRecipesInit() {
    const reponse = await fetch("../data/recipes.json");
    const data = await reponse.json();

    var { recipes } = data;

    const ingredientsList = [];
    recipes[0].ingredients.forEach((ingredient) => {
        ingredientsList.push(ingredient.ingredient);
      });
    console.log(ingredientsList);
   
    // Affichage des recettes
    const recipesContainer = document.getElementById("recipes-container");
    displayCountRecipes(recipes.length);
    recipes.forEach((recipe) => {
        const recipeCard = document.createElement("div");        
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
                <span class="recipe-card__ustensils">${recipe.ustensils}</span>
                <br>
                <span class="recipe-card__appliance">${recipe.appliance}</span>
                <br>
                <span class="ingredient-list">${ingredientsList}</span>
            </div>
        </div>
        `; 
        recipesContainer.appendChild(recipeCard);
        
    }
    );



function createDropdownsElements(uniqueElements) {
 const dropdownMenu = document.getElementById("ingredients-list");
const dropdownMenu2 = document.getElementById("appareils-list");
const dropdownMenu3 = document.getElementById("ustensiles-list");

  uniqueElements.ingredients.forEach((ingredientName) => {
    const ingredientItem = document.createElement("li");
    ingredientItem.classList.add("dropdown-item");
    ingredientItem.textContent = capitalize(ingredientName);
    dropdownMenu.appendChild(ingredientItem);

    ingredientItem.addEventListener("click", async function () {
      await displayTag(ingredientName);
    });
  });

  uniqueElements.appliances.forEach((recipeAppliance) => {
    const applianceItem = document.createElement("li");
    applianceItem.classList.add("dropdown-item");
    applianceItem.textContent = capitalize(recipeAppliance);
    dropdownMenu2.appendChild(applianceItem);

    applianceItem.addEventListener("click", async function () {
      await displayTag(recipeAppliance);
    });
  });

  uniqueElements.ustensils.forEach((ustensilName) => {
    const ustensilItem = document.createElement("li");
    ustensilItem.classList.add("dropdown-item");
    ustensilItem.textContent = capitalize(ustensilName);
    dropdownMenu3.appendChild(ustensilItem);

    ustensilItem.addEventListener("click", async function () {
      await displayTag(ustensilName);
    });
  });
}

const uniqueElements = getUniqueElementsForDropdownList(recipes);
console.log(uniqueElements); //TEST
createDropdownsElements(uniqueElements);

//créer une fonction de recherche dans la barre principale. La fonction doit uniquement servir à rechercher. On lui passer comme argument le tableau des recettes. Elle doit retourner un tableau de recettes filtrées (recipes).


//Fonction de recherche dans la barre principale
async function filterFromRecipesDataBAse() {
    const recipesFromDataBase = await getRecipesOnDemand();
    const mainSearchInput = document.getElementById("search").value.toUpperCase();
    const recipecards = document.querySelectorAll(".recipe-card");
    const counterRecipe = document.getElementById("count-recipes");
    const noResult = document.getElementById("no-result");
    noResult.textContent = "";
    counterRecipe.textContent = "";
    const matchedRecipes = [];
    for (let i = 0; i < recipesFromDataBase.length; i++) {
        const recipe = recipesFromDataBase[i];
        const recipeTitle = recipe.name.toUpperCase();
        const recipeIngredients = recipe.ingredients.map((ingredient) => {
            if (ingredient.quantity === undefined) {
                return ingredient.ingredient.toUpperCase();
            }
            if (ingredient.unit === undefined) {
                ingredient.unit = "";
            }
            return `${ingredient.ingredient.toUpperCase()} : ${ingredient.quantity} ${ingredient.unit}`;
        }).join("");
        const recipeDescription = recipe.description.toUpperCase();
        const recipeTime = recipe.time.toString().toUpperCase();
        const recipeAppliance = recipe.appliance.toUpperCase();
        const recipeUstensils = recipe.ustensils.map((ustensil) => ustensil.toUpperCase()).join("");
        if (recipeTitle.includes(mainSearchInput) || recipeIngredients.includes(mainSearchInput) || recipeDescription.includes(mainSearchInput) || recipeTime.includes(mainSearchInput) || recipeAppliance.includes(mainSearchInput) || recipeUstensils.includes(mainSearchInput)) {
            matchedRecipes.push(recipe);
        }
    }
    console.log(matchedRecipes); //TEST
    counterRecipe.textContent = `${matchedRecipes.length} recettes`;
    if (matchedRecipes.length === 0) {
        noResult.textContent = `Aucune recette ne contient "${mainSearchInput}"… vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    }
    return matchedRecipes;
}
console.log(matchedRecipes)

//Fonction de recherche dans les dropdownMenus
function filterDropdownList() {
const searchInputs = document.querySelectorAll(".search-input");


searchInputs.forEach((searchInput) => {
    searchInput.addEventListener("input", function() {
        const filter = searchInput.value.toUpperCase();
        console.log(filter); //TEST
        const dropdownItems = document.querySelectorAll(".dropdown-item");
        console.log(dropdownItems); //TEST

        dropdownItems.forEach((dropdownItem) => {
            const dropdownItemText = dropdownItem.textContent.toUpperCase();
            console.log(dropdownItemText); //TEST
            if (dropdownItemText.includes(filter)) {
                dropdownItem.style.display = "";
            } else {
                dropdownItem.style.display = "none";
            }
        });
    });
});
}

filterDropdownList();



function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function displayTag(text) {
  const mainSearchInput = document.getElementById("search");
  const searchInputs = document.querySelectorAll(".search-input");
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  const tagDisplay = document.getElementById("tag-display");
  const tag = document.createElement("div");
  tag.classList.add("tag");
  tag.textContent = capitalize(text);
  
   

    mainSearchInput.value = tag.textContent;
    await filterRecipes();
    mainSearchInput.value = "";

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
    resetRecipeDisplay();
    counterRecipe.textContent = `${matchedRecipes.length} recettes`;
    
  });
}


}

getRecipesInit();



// Filtre des recettes avec une boucle forEach
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


const counterRecipe = document.getElementById("count-recipes");
const recipes = document.querySelectorAll(".recipe-card");
counterRecipe.textContent = `${recipes.length} recettes`;
const tagDisplay = document.getElementById("tag-display");


document.getElementById("search").addEventListener("input", debounce(filterRecipes, 300));

let filteredRecipes = [];

async function filterRecipes() {
    displayCountRecipes(); 
    const recipesFromDataBase = await getRecipesOnDemand();
    const mainSearchInput = document.getElementById("search").value.toUpperCase();
    const recipesFromPage = document.querySelectorAll(".recipe-card");
    const counterRecipe = document.getElementById("count-recipes");
    
    if (mainSearchInput.length < 3) {
        counterRecipe.textContent = `${recipesFromDataBase.length} recettes`;
        resetRecipeDisplay();  
        return;
    }

    if (mainSearchInput.length > 2) {
        filteredRecipes = Array.from(recipesFromPage);
    }

    const matchedRecipes = [];

    for (let i = 0; i < filteredRecipes.length; i++) {
         
        const recipe = filteredRecipes[i];

        //retrieve data from the recipe json file
        const recipeTitle = recipesFromDataBase[i].name.toUpperCase();

        const recipeIngredients = recipesFromDataBase[i].ingredients.map((ingredient) => {
            if (ingredient.quantity === undefined) {
                return ingredient.ingredient.toUpperCase();
            }
            if (ingredient.unit === undefined) {
                ingredient.unit = "";
            }
            return `${ingredient.ingredient.toUpperCase()} : ${ingredient.quantity} ${ingredient.unit}`;
        }).join("");

        const recipeDescription = recipesFromDataBase[i].description.toUpperCase();
        const recipeTime = recipesFromDataBase[i].time.toString().toUpperCase();
        const recipeAppliance = recipesFromDataBase[i].appliance.toUpperCase();
        const recipeUstensils = recipesFromDataBase[i].ustensils.map((ustensil) => ustensil.toUpperCase()).join(""); 

        if (recipeTitle.includes(mainSearchInput) || recipeIngredients.includes(mainSearchInput) || recipeDescription.includes(mainSearchInput) || recipeTime.includes(mainSearchInput) || recipeAppliance.includes(mainSearchInput) || recipeUstensils.includes(mainSearchInput)) {
            matchedRecipes.push(recipe);
            recipe.style.display = "";
        } else {
            recipe.style.display = "none";
        }
    }

    filteredRecipes = matchedRecipes;
    counterRecipe.textContent = `${matchedRecipes.length} recettes`;

    if (filteredRecipes.length === 0) {
        const noResult = document.getElementById("no-result");
        noResult.textContent = `Aucune recette ne contient "${mainSearchInput}"… vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    }

}






function displayCountRecipes(count) {
    const counterRecipe = document.getElementById("count-recipes");
    const noResult = document.getElementById("no-result");
    const search = document.getElementById("search");
    noResult.textContent = "";
    counterRecipe.textContent = "";
    if (count > 1) {
        counterRecipe.textContent = `${count} recettes`;
        return;
    }
    if (count === 1){
        counterRecipe.textContent = `${count} recette`;
        return;
    }
    if (count === 0) {
        noResult.textContent = `Aucune recette ne contient "${search.value}"… vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
        return;
  }
}


function resetRecipeDisplay() {
    const recipes = document.querySelectorAll(".recipe-card");
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


    // Toggle active class on the dropdown when clicking and keep it open when clicking inside the search input.
  
    const dropdowns = document.querySelectorAll('.dropdown2');
    const searchInput = document.querySelectorAll('.search-input');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    console.log(dropdownItems); //TEST
  
    dropdownItems.innerHTML = "";
    
    dropdowns.forEach(function(dropdown) {
        dropdown.addEventListener('click', function() {
            dropdown.classList.toggle('active');
        
    }
    );
    });
  
    searchInput.forEach(function(input) {
        input.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    window.addEventListener('click', function(e) {
        dropdowns.forEach(function(dropdown) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
              
            }
        });
    });
    
