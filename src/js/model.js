import { API_URL, RES_PER_PAGE, KEY } from './config.js';
import { async } from 'regenerator-runtime';
import { AJAX } from './helpers.js';

// console.log(getJSON);
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsUnsorted: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
    sortby: 'none',
  },
  bookmarks: [],
  ingredientsToAdd: [],
  shoppingList: [],
};

const persistBookmarks = function () {
  //add bookmark
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }), //jezeli key nie ma to short circuting i nie bedzie nic
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
    // console.log(data.data);
  } catch (err) {
    console.error(`${err}🧨🧨🧨 `);
    throw err;
  }
};

export const setShoppingList = function () {
  let shoppingList = state.shoppingList;

  state.recipe.ingredients.forEach(ing => {
    const item = {
      description: ing.description,
      unit: ing.unit,
      quantity: ing.quantity,
    };
    const el = shoppingList.find(
      y => y.description === ing.description && y.unit === ing.unit
    );
    if (el) {
      el.quantity += ing.quantity;
    } else {
      shoppingList.push(item);
    }
  });
  state.shoppingList = shoppingList;

  return state.shoppingList;
};
export const clearShoppingList = function () {
  state.shoppingList = [];
  console.log(state.shoppingList);
  return state.shoppingList;
};

export const addIngredients = function (ing) {
  if (ing !== 'refresh') state.ingredientsToAdd.push(ing);
  return state.ingredientsToAdd;
};
export const removeIngredients = function (ing) {
  const ingArr = state.ingredientsToAdd.filter(
    el => el.ingId !== ing[0].ingId
    // el == ing[0]
  );

  state.ingredientsToAdd = ingArr;

  return state.ingredientsToAdd;
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.resultsUnsorted = [];
    state.search.results = data.data.recipes.map(rec => {
      const recipesResults = {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };

      state.search.resultsUnsorted.push(recipesResults);

      return recipesResults;
    });

    // console.log(state.search.results);
    state.search.page = 1;
  } catch (err) {
    console.error(`${err}🧨🧨🧨 `);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const setSortType = function (sortType) {
  // if (sortType === 'duration')
  // state.search.sortby = ;
  console.log(state.search.resultsUnsorted);
  if (sortType === 'none') {
    state.search.sortby = 'titleUp'; /////// TUTAJ ZACZAC SORTOWAC
    state.search.results.sort((a, b) => (a.title > b.title ? 1 : -1));
  } else if (sortType === 'titleUp') {
    state.search.sortby = 'titleDown';
    state.search.results.sort((a, b) => (a.title < b.title ? 1 : -1));
  } else if (sortType === 'titleDown') {
    state.search.sortby = 'publisherUp';
    state.search.results.sort((a, b) => (a.publisher > b.publisher ? 1 : -1));
  } else if (sortType === 'publisherUp') {
    state.search.sortby = 'publisherDown';
    state.search.results.sort((a, b) => (a.publisher < b.publisher ? 1 : -1));
  } else if (sortType === 'publisherDown') {
    state.search.sortby = 'none';
    state.search.results = [...state.search.resultsUnsorted];
  }

  return state.search.sortby;
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  //add bookmark
  state.bookmarks.push(recipe);
  //mark curr recip as bookmark

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  //delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {
    // const ingredients = Object.entries(newRecipe)
    //   .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
    //   .map(ing => {
    //     const ingArr = ing[1].split(',').map(el => el.trim());
    //     // const ingArr = ing[1].replaceAll(' ', '').split(',');

    //     if (ingArr.length !== 3)
    //       throw new Error(
    //         'Wrong ingredients format! Please use the correct format'
    //       );

    //     const [quantity, unit, description] = ingArr;
    //     return { quantity, unit, description };
    //   });
    console.log(newRecipe);
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients: newRecipe.ingredients,
    };
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    // console.log(recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
