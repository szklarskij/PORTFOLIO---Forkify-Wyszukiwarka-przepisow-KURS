import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    const today = new Date();
    const todayString = `${today.getDate()}/${today.getMonth() + 1}`;
    let timestamp = today.setDate(today.getDate() + 1);
    const tomorrow = new Date(timestamp);
    const tomorrowString = `${tomorrow.getDate()}/${tomorrow.getMonth() + 1}`;

    // console.log(this._data);
    if (this._data.recipe.length !== 0) {
      const recipeParse = JSON.parse(this._data.recipe[0]);

      return `
    <li class="plan__recipes">
<div class="plan__date--container"><span class="plan__date--day">${
        this._data.dayId === todayString
          ? 'Today'
          : this._data.dayId === tomorrowString
          ? 'Tomorrow'
          : this._data.day
      }</span><span class="plan__date--date">${this._data.dayId}</span></div>
        <div class="preview plan__fig" data-id="${recipeParse.id}">
            <a class="preview__link" href="#${recipeParse.id}">
              <figure class="preview__fig">
                <img src="${recipeParse.image}" alt="${recipeParse.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${recipeParse.title}</h4>
                <p class="preview__publisher">${
                  this._data.servings
                } servings</p>
                <div class="preview__user-generated ${
                  recipeParse.key ? '' : 'hidden'
                }">
                <svg>
                <use href="${icons}#icon-user"></use>
                </svg>
                </div>
            </div>
            </a>
          </div>
          <button class="plan__closeBtn" data-id="${
            this._data.dayId
          }">&times;</button>
          </li>
    `;
    } else {
      return `    <li class=plan__recipes>
      <div class="plan__date--container"><span class="plan__date--day">${
        this._data.dayId === todayString
          ? 'Today'
          : this._data.dayId === tomorrowString
          ? 'Tomorrow'
          : this._data.day
      }</span><span class="plan__date--date">${this._data.dayId}</span></div>
              <div class="plan__empty">
<span>Empty</span>
                </div>
                </li>`;
    }
  }
}

export default new PreviewView();
