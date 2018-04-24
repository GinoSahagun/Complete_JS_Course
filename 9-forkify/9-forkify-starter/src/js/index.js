// Global app controller
import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";
import Recipe from "./models/Recipe"

/** Global state of the app
 *  - Search Object
 *  - Current Recipe Object
 *  - Shopping List Object
 *  - Liked Recipes
 */
const state = {};

const controlSearch = async () => {
  // 1. Get the query from view
  const query = searchView.getInput();
  console.log(query); // @TODO

  if (query) {
    // 2. New search object and add to state
    state.search = new Search(query);

    try {
    // 3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    // 4. Search for recipes
    await state.search.getResults();

    // 5. render results on UI
    searchView.renderResults(state.search.result);
    clearLoader();
    }
    catch (err){
      console.log(err);
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

window.searchForm.addEventListener("load", e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  console.log(e.target);
  if (btn){
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
})

/** 
 * Recipe Controller
 * 
*/
const controlRecipe = async () => {
  const id = window.location.hash;
  console.log(id);
  if (id){
    // Prepare UI for Changes

    // Create new Recipe Object
    state.recipe = new Recipe(id);
    window.r = state.recipe;

    // Get Recipe Data
    try {
      await state.recipe.getRecipe();

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServing();
      // Render Recipe
    }
    catch (err){
      console.log(err);
    }

  }
}

['hashchange', 'load'].forEach(event => {
  window.addEventListener(event, controlRecipe);
});
