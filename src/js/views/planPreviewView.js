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

    if (this._data.recipe.length !== 0) {
      return `
    <li class="plan__recipes">
<div class="plan__date--container"><span class="plan__date--day">${
        this._data.dayId === todayString
          ? 'Today'
          : this._data.dayId === tomorrowString
          ? 'Tomorrow'
          : this._data.day
      }</span><span class="plan__date--date">${this._data.dayId}</span></div>
        <div class="preview plan__empty" data-id="${this._data.recipe[0].id}">
            <a class="preview__link" href="#${this._data.recipe[0].id}">
              <figure class="preview__fig">
                <img src="${this._data.recipe[0].image}" alt="${
        this._data.recipe[0].title
      }" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this._data.recipe[0].title}</h4>
                <p class="preview__publisher">${
                  this._data.servings
                } servings</p>
                <div class="preview__user-generated ${
                  this._data.recipe[0].key ? '' : 'hidden'
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
