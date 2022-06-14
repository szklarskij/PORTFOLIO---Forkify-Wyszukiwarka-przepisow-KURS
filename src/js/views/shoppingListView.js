import View from './View.js';
import icons from 'url:../../img/icons.svg';
import ingredientsToBuyView from './ingredientsToBuyView.js';
// import { of } from 'core-js/core/array';

class ShoppingListView extends View {
  _parentElement = document.querySelector('.shopping-list__list');
  // _message = 'Recipe was successfully uploaded!';

  _window = document.querySelector('.shopping-list-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--shopping-list');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnClear = document.querySelector('.clear__btn');
  _btnCopy = document.querySelector('.copy__btn');

  constructor() {
    const _element = '';
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    this._addHandlerCopyList();
    // this._addHandlerClearList();
    // this._addHandlerAddIng();
  }
  closeWindow() {
    this._overlay.classList.add('hidden');
    this._window.classList.add('hidden');
  }
  openWindow() {
    this._overlay.classList.remove('hidden');
    this._window.classList.remove('hidden');
    document.querySelectorAll('.error').forEach(el => el.remove());
    // this._clearInputsAll();
  }
  copyList() {
    let text = [];
    this._parentElement
      .querySelectorAll('.shopping-list__list--el')
      .forEach((el, index) => {
        const textLine = `${index + 1}. ${el.textContent.slice(0, -4)}`;
        text.push(textLine);
      });
    let textToCopy = '';
    text.forEach(text => {
      textToCopy = textToCopy + text + `\n`;
    });

    navigator.clipboard.writeText(`Shopping list:\n ${textToCopy}`);
    alert('Shopping list copied to clipboard!');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.openWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.closeWindow.bind(this));
    this._overlay.addEventListener('click', this.closeWindow.bind(this));
  }
  addHandlerClearList(handler) {
    this._btnClear.addEventListener('click', function () {
      handler();
    });
  }
  _addHandlerCopyList() {
    this._btnCopy.addEventListener('click', this.copyList.bind(this));
  }

  _generateMarkup() {
    if (this._data[0] !== 'noList') {
      document.querySelector('.copy__btn').classList.remove('hiddenNoDisplay');
      document.querySelector('.clear__btn').classList.remove('hiddenNoDisplay');
      this._parentElement.style.height = '30rem';
      document.querySelector('.shopping-list__heading').textContent =
        'Shopping list';
      return this._data
        .map(ings => ingredientsToBuyView.render(ings, false))
        .join('');
    } else {
      document.querySelector('.shopping-list__heading').textContent =
        'No shopping list yet!';
      document.querySelector('.copy__btn').classList.add('hiddenNoDisplay');
      document.querySelector('.clear__btn').classList.add('hiddenNoDisplay');
      this._parentElement.style.height = '5rem';
      // btn.classList.add('.hiddenNoDisplay');

      return 'Add ingredients by clicking on shopping cart.';
    }

    // this._element = this._data.forEach(el => {
    // `<li class="shopping-list__list--el">${el.description}: ${el.quantity} ${el.unit}</li>`;
    // console.log(this._element);
    // });
    // return this._element;
  }
}

export default new ShoppingListView();
