// Récupération des données depuis le fichier JSON
async function getRecipes() {
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



    //Fonction qui va récupérer les ingrédients, les appareils, les ustensiles et les afficher dans les fitres de la liste déroulante.

const dropdownMenu = document.getElementById("ingredients-list");
const dropdownMenu2 = document.getElementById("appareils-list");
const dropdownMenu3 = document.getElementById("ustensiles-list");


function getFilterDropdownList() {
  const uniqueIngredients = new Set();
  const uniqueAppliances = new Set();
  const uniqueUstensils = new Set();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const ingredientName = ingredient.ingredient.toLowerCase();
      uniqueIngredients.add(ingredientName);
    });

    const recipeAppliance = recipe.appliance.toLowerCase();
    uniqueAppliances.add(recipeAppliance);

    recipe.ustensils.forEach((ustensil) => {
      const ustensilName = ustensil.toLowerCase();
      uniqueUstensils.add(ustensilName);
    });
  });

  uniqueIngredients.forEach((ingredientName) => {
    const ingredientItem = document.createElement("li");
    ingredientItem.classList.add("dropdown-item");
    ingredientItem.textContent = capitalize(ingredientName);
    dropdownMenu.appendChild(ingredientItem);

    ingredientItem.addEventListener('click', function() {
      displayTag(ingredientName);
    });
  });

  uniqueAppliances.forEach((recipeAppliance) => {
    const applianceItem = document.createElement("li");
    applianceItem.classList.add("dropdown-item");
    applianceItem.textContent = capitalize(recipeAppliance);
    dropdownMenu2.appendChild(applianceItem);

    applianceItem.addEventListener('click', function() {
      displayTag(recipeAppliance);
    });
  });

  uniqueUstensils.forEach((ustensilName) => {
    const ustensilItem = document.createElement("li");
    ustensilItem.classList.add("dropdown-item");
    ustensilItem.textContent = capitalize(ustensilName);
    dropdownMenu3.appendChild(ustensilItem);

    ustensilItem.addEventListener('click', function() {
      displayTag(ustensilName);
   
    });


  });


}

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

function displayTag(text) {
  console.log("here1");
  const mainSearchInput = document.getElementById("search");
  const searchInputs = document.querySelectorAll(".search-input");
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  const tagDisplay = document.getElementById("tag-display");
  const tag = document.createElement("div");
  tag.classList.add("tag");
  tag.textContent = capitalize(text);
  
  mainSearchInput .value = tag.textContent;
    filterRecipes();
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

    
    resetRecipeDisplay();
    displayCountRecipes(recipes.length);
  });
}

getFilterDropdownList();

}

getRecipes();



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

function filterRecipes() {
    const mainSearchInput = document.getElementById("search").value.toUpperCase();
    const recipes = document.querySelectorAll(".recipe-card");
    const counterRecipe = document.getElementById("count-recipes");
    
    if (mainSearchInput.length < 3) {
        counterRecipe.textContent = `${recipes.length} recettes`;
        resetRecipeDisplay();  
        return;
    }

    if (mainSearchInput.length > 2) {
        filteredRecipes = Array.from(recipes);
    }

   
    const matchedRecipes = [];

    for (let i = 0; i < filteredRecipes.length; i++) {
         
        const recipe = filteredRecipes[i];
        const recipeTitle = recipe.querySelector(".recipe-card__title").textContent.toUpperCase();
        const recipeIngredients = recipe.querySelector(".recipe-card__ingredients").textContent.toUpperCase();
        const recipeDescription = recipe.querySelector(".recipe-card__description").textContent.toUpperCase();
        const recipeTime = recipe.querySelector(".recipe-card__time").textContent.toUpperCase();
        const recipeAppliance = recipe.querySelector(".recipe-card__appliance").textContent.toUpperCase();
        const recipeUstensils = recipe.querySelector(".recipe-card__ustensils").textContent.toUpperCase();
      

        if (recipeTitle.includes(mainSearchInput) || recipeIngredients.includes(mainSearchInput) || recipeDescription.includes(mainSearchInput) || recipeTime.includes(mainSearchInput) || recipeAppliance.includes(mainSearchInput) || recipeUstensils.includes(mainSearchInput)) {
            matchedRecipes.push(recipe);
            recipe.style.display = "";
        } else {
            recipe.style.display = "none";
        }
    }

    filteredRecipes = matchedRecipes;

    // updateFilterDropdownsList(filteredRecipes)

    displayCountRecipes(filteredRecipes.length);
    

}

// function updateFilterDropdownsList(filteredRecipes) {
//     const dropdownItems = document.querySelectorAll(".dropdown-item");
//     const ingredientsList = document.getElementById("ingredients-list");
//     const appareilsList = document.getElementById("appareils-list");
//     const ustensilesList = document.getElementById("ustensiles-list");
//     const ingredientsListItems = ingredientsList.querySelectorAll(".dropdown-item");
//     const appareilsListItems = appareilsList.querySelectorAll(".dropdown-item");
//     const ustensilesListItems = ustensilesList.querySelectorAll(".dropdown-item");
//     const ingredientsListItemsText = [];
//     const appareilsListItemsText = [];
//     const ustensilesListItemsText = [];

//     ingredientsListItems.forEach((item) => {
//         ingredientsListItemsText.push(item.textContent);
//     });

//     appareilsListItems.forEach((item) => {
//         appareilsListItemsText.push(item.textContent);
//     });

//     ustensilesListItems.forEach((item) => {
//         ustensilesListItemsText.push(item.textContent);
//     });

//     const uniqueIngredients = new Set();
//     const uniqueAppliances = new Set();
//     const uniqueUstensils = new Set();

//     filteredRecipes.forEach((recipe) => {
//         recipe.querySelectorAll(".recipe-card__ingredients li").forEach((ingredient) => {
//             const ingredientName = ingredient.textContent.toLowerCase();
//             uniqueIngredients.add(ingredientName);
//         });

//         const recipeAppliance = recipe.querySelector(".recipe-card__appliance").textContent.toLowerCase();
//         uniqueAppliances.add(recipeAppliance);

//         recipe.querySelectorAll(".recipe-card__ustensils li").forEach((ustensil) => {
//             const ustensilName = ustensil.textContent.toLowerCase();
//             uniqueUstensils.add(ustensilName);
//         });
//     });

//     uniqueIngredients.forEach((ingredientName) => {
//         if (!ingredientsListItemsText.includes(ingredientName)) {
//             const ingredientItem = document.createElement("li");
//             ingredientItem.classList.add("dropdown-item");
//             ingredientItem.textContent = capitalize(ingredientName);
//             ingredientsList.appendChild(ingredientItem);

//             ingredientItem.addEventListener('click', function() {
//                 displayTag(ingredientName);
//             });
//         }
//     });

//     uniqueAppliances.forEach((recipeAppliance) => {
//         if (!appareilsListItemsText.includes(recipeAppliance)) {
//             const applianceItem = document.createElement("li");
//             applianceItem.classList.add("dropdown-item");
//             applianceItem.textContent = capitalize(recipeAppliance);
//             appareilsList.appendChild(applianceItem);

//             applianceItem.addEventListener('click', function() {
//                 displayTag(recipeAppliance);
//             });

//         }
//     });

//     uniqueUstensils.forEach((ustensilName) => {
//         if (!ustensilesListItemsText.includes(ustensilName)) {
//             const ustensilItem = document.createElement("li");
//             ustensilItem.classList.add("dropdown-item");
//             ustensilItem.textContent = capitalize(ustensilName);
//             ustensilesList.appendChild(ustensilItem);

//             ustensilItem.addEventListener('click', function() {
//                 displayTag(ustensilName);
//             });
//         }
//     });

//     dropdownItems.forEach((dropdownItem) => {
//         const dropdownItemText = dropdownItem.textContent.toLowerCase();
//         if (dropdownItemText.includes(filter)) {
//             dropdownItem.style.display = "";
//         } else {
//             dropdownItem.style.display = "none";
//         }
//     });
// }


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
    // let counterRecipe = document.getElementById("count-recipes");
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
    
