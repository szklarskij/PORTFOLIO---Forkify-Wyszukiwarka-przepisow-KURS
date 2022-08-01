import View from './View.js';
import icons from 'url:../../img/icons.svg';
import previewShoppingView from './previewShoppingView.js';
import ingredientsToBuyView from './ingredientsToBuyView.js';
import { COUNTER } from '../config.js';
// import { of } from 'core-js/core/array';

class ShoppingListView extends View {
  _parentElement = document.querySelector('.shopping-list__recipes');
  // _message = 'Recipe was successfully uploaded!';

  _window = document.querySelector('.shopping-list-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--shopping-list');
  _btnClose = document.getElementById('btn--close-shopping-list');
  _btnClear = document.querySelector('.clear__btn');
  _btnCopy = document.querySelector('.copy__btn');
  _alertWindow = document.querySelector('.alert-window');

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
    this.discardTimer();
    this._overlay.classList.add('hidden');
    this._window.classList.add('hidden');
    this._alertWindow.classList.add('hidden');
  }
  openWindow() {
    this._overlay.classList.remove('hidden');
    this._window.classList.remove('hidden');
    this._parentElement.classList.remove('hiddenNoDisplay');
    document.querySelector('.shopping-list__list').classList.remove('hidden');
    this.discardTimer();
    // document.querySelectorAll('.error').forEach(el => el.remove());
  }

  addHandlerPlusServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      const updateTo = { ...btn.dataset };
      handler(updateTo);
    });
  }

  addHandlerShowList(handler) {
    this._btnOpen.addEventListener(
      'click',
      function () {
        // console.log(this._status);
        if (this._status === 0 || !this._status) {
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
    this.closeWindow();
    this.showAlert('Shopping list copied to clipboard!');
    // alert('Shopping list copied to clipboard!');
  }
  checkStatus() {
    if (this._status <= 0) {
      this.closeWindow();
      this._parentElement.classList.add('hiddenNoDisplay');
      document.querySelector('.shopping-list__list').classList.add('hidden');
      this.showAlert(
        'Shopping list is empty! Add ingredients by clicking on shopping cart at certain recipe!'
      );
    }
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
    if (this._status !== 0) {
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
