import View from './View.js';
import ingredientsToBuyView from './ingredientsToBuyView.js';

class ShoppingListIngView extends View {
  _parentElement = document.querySelector('.shopping-list__list');

  _generateMarkup() {
    if (this._data[0] !== 'noList') {
      this._parentElement.style.height = '30rem';
      return this._data
        .map(recipes => ingredientsToBuyView.render(recipes, false))
        .join('');
    }
    this._parentElement.style.height = '5rem';
    return;
    // this._element = this._data.forEach(el => {
    // `<li class="shopping-list__list--el">${el.description}: ${el.quantity} ${el.unit}</li>`;
    // console.log(this._element);
    // });
    // return this._element;
  }
}

export default new ShoppingListIngView();
