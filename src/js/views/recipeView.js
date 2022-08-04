import View from './View.js';

import icons from 'url:../../img/icons.svg';
import cartIconWhite from 'url:../../img/icons/cartwhite.svg';
import calendarIconWhite from 'url:../../img/icons/calendarWhite.svg';
import { Fraction } from 'fractional';
// import { set } from 'core-js/core/dict';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;

      const { updateTo } = btn.dataset;

      if (+updateTo > 0) handler(+updateTo);
    });
  }
  addHandlerAddShoppingList(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('.btn--shoppin-list');
        if (!btn) return;
        // console.log(this._data);
        this._alertShoppingList();
        this.showAlert('Ingredients added to shopping list!');
        handler();
      }.bind(this)
    );
  }

  addHandlerCheckNutri(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('.nutri__btn');
        if (!btn) return;
        // console.log(this._data);
        handler();
      }.bind(this)
    );
  }

  addHandlerAddDay(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.days__field');
      if (!btn) return;
      const date = btn.firstChild.textContent;
      // document.querySelector('.days').style.visibility = 'hidden';
      // document.querySelector('.days').style.opacity = '0';
      handler(date);
    });
  }
  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }
  _alertShoppingList() {
    const icon = document.querySelector('.icon__cart');
    icon.classList.add('alert__shake');

    setTimeout(function () {
      icon.classList.remove('alert__shake');
    }, 1000);
  }
  _generateMarkup() {
    // console.log('lol');
    // const recipeParse = JSON.parse(this._data.days[0].recipe[0]);
    // console.log(recipe);
    return `
    <figure class="recipe__fig">
    <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--update-servings" data-update-to="${
          this._data.servings - 1
        }">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--update-servings" data-update-to="${
          this._data.servings + 1
        }">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
    <svg>
      <use href="${icons}#icon-user"></use>
    </svg>
  </div>
  <div class="recipe__btns">
  <button class="btn--round btn--calendar">
    <img

    src=${calendarIconWhite}
    alt="calendar"
  />
    </button>
    <div class="days">
    <span class="days__title">ASSIGN THIS RECIPE FOR NEXT 7 DAYS</span>
    <ul class="days__list">
    <li class="days__field days__day--1"><span class="days_field--data">${
      this._data.days[0].dayId
    }</span>
Today${
      this._data.days[0].recipe.length === 0
        ? ''
        : `: <span class="days_field--recipe">${
            JSON.parse(this._data.days[0].recipe[0]).title
          }</span>`
    }</li>
    <li class="days__field days__day--2"><span class="days_field--data">${
      this._data.days[1].dayId
    }</span>Tomorrow${
      this._data.days[1].recipe.length === 0
        ? ''
        : `: <span class="days_field--recipe">${
            JSON.parse(this._data.days[1].recipe[0]).title
          }</span>`
    }</li>
    <li class="days__field days__day--3"><span class="days_field--data">${
      this._data.days[2].dayId
    }</span>${this._data.days[2].day}${
      this._data.days[2].recipe.length === 0
        ? ''
        : `: <span class="days_field--recipe">${
            JSON.parse(this._data.days[2].recipe[0]).title
          }</span>`
    }</li>
    <li class="days__field days__day--4"><span class="days_field--data">${
      this._data.days[3].dayId
    }</span>${this._data.days[3].day}${
      this._data.days[3].recipe.length === 0
        ? ''
        : `: <span class="days_field--recipe">${
            JSON.parse(this._data.days[3].recipe[0]).title
          }</span>`
    }</li>
    <li class="days__field days__day--5"><span class="days_field--data">${
      this._data.days[4].dayId
    }</span>${this._data.days[4].day}${
      this._data.days[4].recipe.length === 0
        ? ''
        : `: <span class="days_field--recipe">${
            JSON.parse(this._data.days[4].recipe[0]).title
          }</span>`
    }</li>
    <li class="days__field days__day--6"><span class="days_field--data">${
      this._data.days[5].dayId
    }</span>${this._data.days[5].day}${
      this._data.days[5].recipe.length === 0
        ? ''
        : `: <span class="days_field--recipe">${
            JSON.parse(this._data.days[5].recipe[0]).title
          }</span>`
    }</li>
    <li class="days__field days__day--7"><span class="days_field--data">${
      this._data.days[6].dayId
    }</span>${this._data.days[6].day}${
      this._data.days[6].recipe.length === 0
        ? ''
        : `: <span class="days_field--recipe">${
            JSON.parse(this._data.days[6].recipe[0]).title
          }</span>`
    }</li>
    
    </ul>
    </div>
    <button class="btn--round btn--shoppin-list">
    <img

    src=${cartIconWhite}
    alt="shopping cart"
  />
    </button>
    <button class="btn--round btn--bookmark">
    <svg class="">
      <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
    </svg>
  </button>
  </div>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">

    ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}


      
    </ul>

    <button class="btn--small nutri__btn">
    <span>Nutrition analysis
    </span>
    </button>

  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }

  _generateMarkupIngredient(ing) {
    {
      return `      <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ing.quantity ? new Fraction(ing.quantity).toString() : ''
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>
    `;
    }
  }
}

export default new RecipeView();
