import View from './View.js';
import ingView from './ingView.js';
import icons from 'url:../../img/icons.svg';
// import { of } from 'core-js/core/array';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.add-recipe-window');
  _message = 'Recipe was successfully uploaded!';

  _btnAddIng = document.querySelector('.plus__btn');
  _uploadForm = document.querySelector('.upload__form');
  _uploadForm2 = document.querySelector('.upload__form--2');
  _btnRemoveIng = document.querySelector('.upload__list');
  _ingList = document.querySelector('.upload__list');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelectorAll('.btn--close-modal');
  _formIngTitle = document.querySelector('.form__ing--title');
  _formIngQuantity = document.querySelector('.form__ing--quantity');
  _formIngUnit = document.querySelector('.form__ing--unit');
  _ingredients;

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    // this._addHandlerAddIng();
  }
  closeWindow() {
    this._overlay.classList.add('hidden');
    this._window.classList.add('hidden');
  }
  openWindow() {
    console.log('open');
    this._overlay.classList.remove('hidden');
    this._window.classList.remove('hidden');
    document.querySelectorAll('.error').forEach(el => el.remove());
    this._uploadForm.classList.remove('hiddenNoDisplay');
    this._uploadForm2.classList.remove('hiddenNoDisplay');
    // this._clearInputsAll();
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.openWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.forEach(item =>
      item.addEventListener('click', this.closeWindow.bind(this))
    );
    this._overlay.addEventListener('click', this.closeWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener(
      'submit',
      function (e) {
        e.preventDefault();
        const dataArr = [...new FormData(this._uploadForm)];
        const data = Object.fromEntries(dataArr);
        data.ingredients = this._ingredients;
        console.log(this._ingredients);
        console.log(this._uploadForm);
        this._uploadForm.classList.add('hiddenNoDisplay');
        this._uploadForm2.classList.add('hiddenNoDisplay');
        handler(data);
      }.bind(this)
    );
  }
  _clearInputs() {
    this._formIngTitle.value = '';
    this._formIngQuantity.value = '';
    this._formIngUnit.value = '';
  }
  _clearInputsAll() {
    console.log(this._parentElement);
    this._parentElement
      .querySelectorAll('input')
      .forEach(el => (el.value = ''));
  }
  addHandlerAddIng(handler) {
    this._btnAddIng.addEventListener(
      'click',
      // this.returnFormData.bind(this)

      function () {
        //sprawdz czy jest pusto
        if (document.querySelector('.form__ing--title').value === '') {
          this.renderIngError('Ingredient title required!');
          setTimeout(function () {
            // console.log(this._data);
            // this.renderIng();
            handler('refresh');
          }, 2000);
          return;
        }
        //sprawdz tylko spacje

        if (
          document.querySelector('.form__ing--title').value.trim().length ===
            0 ||
          (document.querySelector('.form__ing--quantity').value <= 0 &&
            document.querySelector('.form__ing--quantity').value.length !== 0)
        ) {
          this.renderIngError('Invalid input!');
          setTimeout(function () {
            // console.log(this._data);
            // this.renderIng();
            handler('refresh');
          }, 2000);
          return;
        }
        const newIng = {
          quantity: document
            .querySelector('.form__ing--quantity')
            .value.replace(/\s+/g, '_'),
          unit: document
            .querySelector('.form__ing--unit')
            .value.replace(/\s+/g, '_'),
          description: document
            .querySelector('.form__ing--title')
            .value.replace(/\s+/g, '_'),
          ingId: Date.now(),
        };

        // this._btnAddIng.insertAdjacentHTML('afterbegin', 'www');
        // console.log(handler);
        handler(newIng);
        this._clearInputs();
      }.bind(this)
    );
  }

  addHandlerRemoveIng(handler) {
    this._btnRemoveIng.addEventListener('click', function (e) {
      const btn = e.target.closest('.upload__list--item');
      if (!btn) return;
      const ingRemove = [JSON.parse(btn.dataset.ing)];
      // console.log(ingRemove);
      handler(ingRemove);
    });
  }
  renderIng(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    this._ingList.innerHTML = '';
    this._data = data;
    this._ingredients = data;
    const markup = this._generateMarkup();

    // if (!render) return markup;

    // console.log(`render' ${data}`);
    this._ingList.insertAdjacentHTML('afterbegin', markup);
  }
  renderIngError(message) {
    this._ingList.innerHTML = '';
    const markup = `<div class="error">
  <div>
    <svg>
      <use href="${icons}#icon-alert-triangle"></use>
    </svg>
  </div>
  <p>${message}</p>
</div>`;

    this._ingList.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    // return this._data.map(result => ingView.render(result)).join('');
    return this._data.map(result => ingView.render(result, false)).join('');
  }
}

export default new AddRecipeView();
