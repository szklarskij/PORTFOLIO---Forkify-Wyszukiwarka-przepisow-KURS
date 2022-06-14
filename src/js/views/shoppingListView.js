import View from './View.js';
import icons from 'url:../../img/icons.svg';
import previewShoppingView from './previewShoppingView.js';
import ingredientsToBuyView from './ingredientsToBuyView.js';
// import { of } from 'core-js/core/array';

class ShoppingListView extends View {
  _parentElement = document.querySelector('.shopping-list__recipes');
  // _message = 'Recipe was successfully uploaded!';

  _window = document.querySelector('.shopping-list-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--shopping-list');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnClear = document.querySelector('.clear__btn');
  _btnCopy = document.querySelector('.copy__btn');

  constructor() {
    const _element = '';
    let _status;
    super();

    this._addHandlerHideWindow();
    this._addHandlerCopyList();
    // this._addHandlerClearList();
    // this._addHandlerAddIng();
  }
  closeWindow() {
    this._overlay.classList.add('hidden');
    this._window.classList.add('hidden');
    document.querySelector('.alert-window').classList.add('hidden');
  }
  openWindow() {
    this._overlay.classList.remove('hidden');
    this._window.classList.remove('hidden');
    // document.querySelectorAll('.error').forEach(el => el.remove());
  }
  addHandlerShowList(handler) {
    this._btnOpen.addEventListener(
      'click',
      function (e) {
        console.log(this._status);
        if (!this._status) {
          console.log('pusto');
          this.showAlert(
            'Shopping list is empty! Add ingredients by clicking on shopping cart at certain recipe!'
          );
        } else {
          this.openWindow();
        }
        handler();
      }.bind(this)
    );
  }

  copyList() {
    let text = [];

    document
      .querySelector('.shopping-list__list')
      .querySelectorAll('.shopping-list__list--el')
      .forEach((el, index) => {
        const textLine = `${index + 1}. ${el.textContent.slice(0, -4)}`;
        text.push(textLine);
      });
    let textToCopy = '';
    text.forEach(text => {
      textToCopy = textToCopy + text + `\n`;
    });
    textToCopy = `Shopping list:\n${textToCopy}`;

    navigator.clipboard.writeText(textToCopy.trim());
    alert('Shopping list copied to clipboard!');
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
      return this._data
        .map(recipes => previewShoppingView.render(recipes, false))
        .join('');
    } else {
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
