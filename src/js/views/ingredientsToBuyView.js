import View from './View.js';

class IngredientsToBuyView extends View {
  _parentElement = '';

  _generateMarkup() {
    const unit = `${this._data.quantity} ${this._data.unit}`;
    return `
 <li class="shopping-list__list--el">${this._data.description} ${
      this._data.quantity ? unit : ''
    }
   </li>`;
  }
}

export default new IngredientsToBuyView();
