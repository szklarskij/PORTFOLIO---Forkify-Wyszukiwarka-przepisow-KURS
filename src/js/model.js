import { API_URL, RES_PER_PAGE, KEY, WEEKDAY } from './config.js';
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
  newIngredients: [],
  shoppingList: [],
  days: [],
};

const persistBookmarks = function () {
  //add bookmark
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

const persistPlan = function () {
  //add plan

  localStorage.setItem('plan', JSON.stringify(state.days));
};
const persistShoppingList = function () {
  //add sl
  localStorage.setItem('shoppingList', JSON.stringify(state.shoppingList));
  localStorage.setItem('ingredients', JSON.stringify(state.ingredientsToAdd));
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
    days: state.days,
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

export const updateServingsShoppingList = function (newServings) {
  const change = state.shoppingList.find(y => y.id === newServings.id);

  change.ingredientsShoppingList.forEach(ing => {
    ing.quantity =
      (ing.quantity * newServings.updateTo) / change.servingsShoppingList;
  });
  // change.servings = +newServings.updateTo;
  change.servingsShoppingList = +newServings.updateTo;
  const list = state.shoppingList.filter(
    recipe => recipe.servingsShoppingList > 0
  );
  state.shoppingList = list;

  let recipeList = state.shoppingList;
  let shoppingList = [];
  list.forEach(recipe =>
    recipe.ingredientsShoppingList.forEach(ing => {
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
    })
  );
  state.ingredientsToAdd = shoppingList;
  state.shoppingList = recipeList;

  persistShoppingList();
};
export const setShoppingList = function () {
  //remove 0 servings recipe
  // const lista = state.shoppingList.filter(recipe => recipe.servings > 0);
  state.recipe.servingsShoppingList = state.recipe.servings;
  state.recipe.ingredientsShoppingList = JSON.parse(
    JSON.stringify(state.recipe.ingredients)
  );
  let recipeList = state.shoppingList;
  let shoppingList = [];

  const addRecipe = recipeList.find(y => y.id === state.recipe.id);
  // if (state.recipe === 0) console.log('zzzero');
  if (!addRecipe) {
    recipeList.push(state.recipe);
  }
  recipeList.forEach(recipe =>
    recipe.ingredientsShoppingList.forEach(ing => {
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
    })
  );

  state.ingredientsToAdd = shoppingList;

  state.shoppingList = recipeList;

  persistShoppingList();
  // console.log(recipeList);
};
export const clearShoppingList = function () {
  state.shoppingList = [];
  persistShoppingList();
  // console.log(state.shoppingList);
  // return state.shoppingList;
};

export const addIngredients = function (ing) {
  if (ing !== 'refresh') state.newIngredients.push(ing);

  return state.newIngredients;
};
export const removeIngredients = function (ing) {
  const ingArr = state.newIngredients.filter(
    el => el.ingId !== ing[0].ingId
    // el == ing[0]
  );

  state.newIngredients = ingArr;

  return state.newIngredients;
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

export const addRecipeToDate = function (date) {
  //delete bookmark
  const assign = state.days.find(y => y.dayId === date);
  assign.recipe = [];
  assign.recipe.push(JSON.stringify(state.recipe));
  // console.log(assign);
  assign.servings = state.recipe.servings;
  // console.log(state.days);

  persistPlan();
};
export const deleteRecipeFromPlan = function (date) {
  //delete bookmark
  const assign = state.days.find(y => y.dayId === date);
  assign.recipe = [];

  persistPlan();
};

export const getRecipesFromPlanToShoppingList = function (dates) {
  // console.log(state.days);
  const dateArr = dates;
  state.shoppingList = [];
  let recipeList = [];
  let recipeListArr = [];
  let shoppingList = [];

  // state.days.forEach(day => {
  //   dateArr.push(day.recipe[0]);
  // });
  // console.log(dateArr);

  // let dateArr = [];
  dateArr.forEach(date => {
    const dayMatch = state.days.find(y => y.dayId === date);
    if (!dayMatch) return;
    const recipeFromDay = [dayMatch.recipe[0], dayMatch.servings];

    if (recipeListArr.length === 0) {
      recipeListArr.push(recipeFromDay);
    } else {
      ////jezeli nie ma takiego to dodaj
      if (!recipeListArr.some(d => d[0].id === recipeFromDay[0].id)) {
        recipeListArr.push(recipeFromDay);
      } else {
        ///jezeli jest taki to zsumuj

        recipeListArr.forEach(r => {
          if (r[0].id === recipeFromDay[0].id) {
            r[1] += recipeFromDay[1];
          }
        });
      }
    }
  });
  //aodaj do shoppingList
  recipeListArr.forEach(r => {
    r[0].servings = r[1];
    recipeList.push(r[0]);
  });
  const recipeListFix = [];
  recipeList.forEach(recipe => {
    const recipeFix = JSON.parse(recipe);
    recipeListFix.push(recipeFix);
  });

  recipeListFix.forEach(recipe => {
    recipe.servingsShoppingList = recipe.servings;

    recipe.ingredientsShoppingList = JSON.parse(
      JSON.stringify(recipe.ingredients)
    );

    recipe.ingredientsShoppingList.forEach(ing => {
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
  });

  state.ingredientsToAdd = shoppingList;

  state.shoppingList = recipeListFix;

  persistShoppingList();
};

const init = function () {
  const storageBookmarks = localStorage.getItem('bookmarks');
  if (storageBookmarks) state.bookmarks = JSON.parse(storageBookmarks);

  const storagePlan = localStorage.getItem('plan');
  if (storagePlan) state.days = JSON.parse(storagePlan);

  const storageShoppingList = localStorage.getItem('shoppingList');
  if (storageShoppingList) state.shoppingList = JSON.parse(storageShoppingList);

  const storageIngredients = localStorage.getItem('ingredients');
  if (storageIngredients)
    state.ingredientsToAdd = JSON.parse(storageIngredients);

  //days

  const today = new Date();
  // let day;
  let timestamp = today.setDate(today.getDate());
  for (let i = 0; i < 7; i++) {
    const date = new Date(timestamp);
    timestamp = today.setDate(today.getDate() + 1);
    const dayString = `${date.getDate()}/${date.getMonth() + 1}`;

    let day = WEEKDAY[date.getDay()];

    const dataObject = {
      dayId: dayString,
      day: day,
      recipe: [],
    };
    state.days.push(dataObject);
  }
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {
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
