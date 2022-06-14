import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PreviewShoppingView extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `

        <li class="preview">
        <div class="previewShopping__container">
        <div class="preview__servingsBtns">
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


        <div>
        <a class="preview__link" href="#${this._data.id}">
        
              <figure class="preview__fig">
                <img src="${this._data.image}" alt="${this._data.title}" />
              </figure>
              <div class="preview__data">
              <h4 class="preview__title">${this._data.title}</h4>
              <p class="preview__publisher">${this._data.servings} servings</p>
              <div class="preview__user-generated ${
                this._data.key ? '' : 'hidden'
              }">
              <svg>
              <use href="${icons}#icon-user"></use>
              </svg>
              </div>
              </div>
              </a>
              </div>
              </div>
              
          </li>
    `;
  }
}

export default new PreviewShoppingView();
