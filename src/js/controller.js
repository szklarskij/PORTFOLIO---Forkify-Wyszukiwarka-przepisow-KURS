import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
// import View from './views/view.js';

import planView from './views/planView.js';
import sortView from './views/sortView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import shoppingListView from './views/shoppingListView.js';
import shoppingListIngView from './views/shoppingListIngView.js';
// import PaginationView from './views/PaginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    //0 update result view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    //1 update bookrmaks

    bookmarksView.update(model.state.bookmarks);

    //2 loading recipy
    await model.loadRecipe(id);

    //3 rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //1 get search qury
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();
    //2 load search
    await model.loadSearchResults(query);
    //3 render results
    resultsView.render(model.getSearchResultsPage());
    //4 render initial pagination buttons
    paginationView.render(model.state.search);
    //5 render sort btns
    sortView.render(model.state.search.sortby);
  } catch (err) {
    console.log(err);
  }
};
const controlSort = function (sortType) {
  // sortView.render(model.state.search.sortby);
  // console.log('llll');
  sortView.render(model.setSortType(sortType));

  resultsView.render(model.getSearchResultsPage());
};

const controlPagination = function (goToPage) {
  //render new result
  resultsView.render(model.getSearchResultsPage(goToPage));
  //render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe servings
  model.updateServings(newServings);
  //update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //1 add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //2update recipe view
  recipeView.update(model.state.recipe);
  //3 render bookmark
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  // console.log(newRecipe);
  try {
    //show spinner
    addRecipeView.renderSpinner(false);

    await model.uploadRecipe(newRecipe);
    // console.log(model.state.recipe);

    //render recipe
    recipeView.render(model.state.recipe);
    //successfull message
    addRecipeView.renderMessage(undefined, false);

    //render bookmark view
    bookmarksView.render(model.state.bookmarks);
    //change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close form window

    setTimeout(function () {
      addRecipeView.closeWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('🧨', err);
    addRecipeView.renderError(err.message, false);
  }
};

const controlAddIng = function (newIng) {
  model.addIngredients(newIng);
  // addRecipeView.generateNewIng(model.state.ingredientsToAdd);
  addRecipeView.renderIng(model.state.ingredientsToAdd);
  // console.log(newIng);
  // console.log('lalala');

  // return newIng;
};
const controlRemoveIng = function (removeIng) {
  model.removeIngredients(removeIng);
  addRecipeView.renderIng(model.state.ingredientsToAdd);
  // console.log(removeIng);
};

const controlShoppingList = function () {
  model.setShoppingList();
  shoppingListView._status = model.state.shoppingList.length;
  shoppingListView.render(model.state.shoppingList);
  shoppingListIngView.render(model.state.ingredientsToAdd);
};

const controlShoppingListServings = function (servings) {
  // console.log(servings);

  model.updateServingsShoppingList(servings);
  // model.setShoppingList();
  shoppingListView._status = model.state.shoppingList.length;
  shoppingListView.checkStatus();
  shoppingListView.render(model.state.shoppingList);
  shoppingListIngView.render(model.state.ingredientsToAdd);
};

const controlShoppingListOpen = function () {
  // model.setShoppingList();
  shoppingListView.render(model.state.shoppingList);
  shoppingListIngView.render(model.state.ingredientsToAdd);
};

const controlClearShoppingList = function (clear) {
  model.clearShoppingList();
  shoppingListView._status = model.state.shoppingList.length;
  shoppingListView.checkStatus();
  shoppingListView.render(model.state.shoppingList);
  shoppingListIngView.render(model.state.ingredientsToAdd);

  // console.log(removeIng);
};

const controlDays = function (date) {
  model.addRecipeToDate(date);
  recipeView.render(model.state.recipe);
};

const controlDeleteRecipeFromPlan = function (date) {
  model.deleteRecipeFromPlan(date);
  planView.render(model.state.recipe);
  recipeView.render(model.state.recipe);
};

const controlPlan = function () {
  planView.render(model.state.recipe);
  // model.addRecipeToDate(date);
  // recipeView.render(model.state.recipe);
};

const controlPlanAddRecipesToShoppingList = function (recipes) {
  // console.log(model.state.days);
  model.getRecipesFromPlanToShoppingList(recipes);
  shoppingListView._status = model.state.shoppingList.length;
};

const init = function () {
  // shoppingListView.addHandlerRender(controlShoppingList);
  planView.addHandlerShowPlan(controlPlan);
  planView.addHandlerDeleteRecipe(controlDeleteRecipeFromPlan);
  planView.addHandlerAddToShoppingList(controlPlanAddRecipesToShoppingList);

  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  recipeView.addHandlerAddShoppingList(controlShoppingList);
  recipeView.addHandlerAddDay(controlDays);
  shoppingListView.addHandlerPlusServings(controlShoppingListServings);
  sortView.addHandlerClick(controlSort);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  shoppingListView.addHandlerClearList(controlClearShoppingList);
  shoppingListView.addHandlerShowList(controlShoppingListOpen);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  addRecipeView.addHandlerAddIng(controlAddIng);
  addRecipeView.addHandlerRemoveIng(controlRemoveIng);
};
init();
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
