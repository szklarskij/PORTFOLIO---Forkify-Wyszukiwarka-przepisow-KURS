import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';
import upArrow from 'url:../../img/icons/sortUpArrow.svg';
import downArrow from 'url:../../img/icons/sortDownArrow.svg';
import * as model from '.././model.js';

class SortView extends View {
  _parentElement = document.querySelector('.sort');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btnDuration = e.target.closest('.sort__btn--duration');
      if (!btnDuration) return;

      handler(model.state.search.sortby);
    });
  }
  // _sortRecipes(sortType) {
  // if (sortType==='titleUp')
  // }
  _generateMarkup() {
    return `          <span >Sort by:</span>
    <div class="sort__item">
      <button class="btn--inline sort__btn--duration">
        <span class="sort__span">
        
        ${
          this._data === 'titleUp' || this._data === 'publisherUp'
            ? `${this._data.slice(0, -2)}     <img
            class="otherIcons"
            src=${upArrow}
            alt="up arrow"
          />`
            : `${
                this._data === 'titleDown' || this._data === 'publisherDown'
                  ? `${this._data.slice(0, -4)}     <img
            class="otherIcons"
            src=${downArrow}
            alt="down arrow"
          />`
                  : `${this._data}`
              }`
        }
        
        </span>
      </button>

    </div>`;
  }
}

export default new SortView();
