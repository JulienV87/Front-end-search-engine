// Récupération des données depuis le fichier JSON
async function getRecipes() {
    const reponse = await fetch("../data/recipes.json");
    const data = await reponse.json();
    // console.log(data);
    var { recipes } = data;
   
    // Affichage des recettes
    const recipesContainer = document.getElementById("recipes-container");
    displayCountRecipes(recipes.length);
    recipes.forEach((recipe) => {
        const recipeCard = document.createElement("div");        
        recipeCard.classList.add("recipe-card","col-4","my-3");
        recipeCard.innerHTML = `
        <div style="height: 565px; width: 90%" class="card-header my-2 mx-3 shadow rounded-4 bg-white text-dark recipe-card__container overflow-hidden">
            <div class="image-container position-relative">
                <img class="card-img-top object-fit-cover" style="height:253px; rounded-top  overflow-hidden" src="./assets/images/${recipe.image}" alt="${recipe.name} style="height:280px;">
                <p class="recipe-card__time position-absolute top-0 end-0 px-3 m-3 bg-warning rounded-5"> ${recipe.time}min</p>
            </div>
            <div class="card-body card-text px-3">
                <h2 class="recipe-card__title">${recipe.name}</h2>
                
                <h3 class="h3-title">Recettes</h3>
                <p style="height: 60px;" class="recipe-card__description col overflow-hidden">${recipe.description}</p>
                <h3 class="h3-title">Ingrédients</h3>
                <ul class="recipe-card__ingredients col list-unstyled ingredients-font-cards">
                    ${recipe.ingredients
                        .map((ingredient) => {
                            if (ingredient.quantity === undefined) {
                                return `<li>${ingredient.ingredient}</li>`;
                            }
                            if (ingredient.unit === undefined) {
                                ingredient.unit = "";
                            }
                            return `<li>${ingredient.ingredient} : <span class="ingredients-unit-font">${ingredient.quantity} ${ingredient.unit}</span></li>`;
                        })
                        .join("")}
                </ul>
                <span class="recipe-card__appliance">${recipe.appliance}</span>
                <span class="recipe-card__ustensils">${recipe.ustensils}</span>
                <span class="recipe-card__ingredient">${recipe.ingredients.ingredient}</span>
                    
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


function getIfilterDropdownList() {
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
    //   filterRecipes(ustensilName);
    });
  });

}


//Fonction de recherche dans les dropdownMenus
const searchInputs = document.querySelectorAll(".search-input");

searchInputs.forEach((searchInput) => {
    searchInput.addEventListener("input", function() {
        const filter = searchInput.value.toUpperCase();
        const dropdownItems = document.querySelectorAll(".dropdown-item");

        dropdownItems.forEach((dropdownItem) => {
            const dropdownItemText = dropdownItem.textContent.toUpperCase();
            if (dropdownItemText.includes(filter)) {
                dropdownItem.style.display = "";
            } else {
                dropdownItem.style.display = "none";
            }
        });
    });
});



function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function displayTag(text) {
  const searchInput = document.getElementById("search");
  const tagDisplay = document.getElementById("tag-display");
  const tag = document.createElement("div");
  tag.classList.add("tag");
  tag.textContent = capitalize(text);
  
  if (searchInput.value = tag.textContent){//TODO 
      filterRecipes();
      searchInput.value = "";
    }
  
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

getIfilterDropdownList();

}

getRecipes();

// Recherche avec une boucle for


const counterRecipe = document.getElementById("count-recipes");
const recipes = document.querySelectorAll(".recipe-card");
counterRecipe.textContent = `${recipes.length} recettes`;
const tagDisplay = document.getElementById("tag-display");


document.getElementById("search").addEventListener("input", debounce(filterRecipes, 300));

let filteredRecipes = [];

function filterRecipes() {
    const filter = document.getElementById("search").value.toUpperCase();
    const recipes = document.querySelectorAll(".recipe-card");
    const counterRecipe = document.getElementById("count-recipes");
    
    if (filter.length < 3) {
        counterRecipe.textContent = `${recipes.length} recettes`;
        resetRecipeDisplay();  
        return;
    }

    if (filter.length > 2) {
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

        if (recipeTitle.includes(filter) || recipeIngredients.includes(filter) || recipeDescription.includes(filter) || recipeTime.includes(filter) || recipeAppliance.includes(filter) || recipeUstensils.includes(filter)) {
    
            matchedRecipes.push(recipe);
            recipe.style.display = "";
            
          
        } else {
            recipe.style.display = "none";
        }
    }


    filteredRecipes = matchedRecipes;
    displayCountRecipes(filteredRecipes.length);
}


function displayCountRecipes(count) {
    const counterRecipe = document.getElementById("count-recipes");
    const noResult = document.getElementById("no-result");
    const search = document.getElementById("search");
    noResult.textContent = "";
    counterRecipe.textContent = "";
    if (count > 1 && count < 10) {
        counterRecipe.textContent = `0${count} recettes`;
        return;
    }
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
  
    
    dropdowns.forEach(function(dropdown) {
        dropdown.addEventListener('click', function() {
            dropdown.classList.toggle('active');
            
        });
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
    
    