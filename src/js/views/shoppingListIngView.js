import View from './View.js';
import ingredientsToBuyView from './ingredientsToBuyView.js';

class ShoppingListIngView extends View {
  _parentElement = document.querySelector('.shopping-list__list');

  _generateMarkup() {
    if (this._status !== 0) {
      this._parentElement.style.height = '30rem';
      return this._data
        .map(recipes => ingredientsToBuyView.render(recipes, false))
        .join('');
    }
  }
}

export default new ShoppingListIngView();
