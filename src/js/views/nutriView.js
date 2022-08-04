import View from './View.js';

class NutriView extends View {
  _parentElement = document.querySelector('.nutri__list');
  _nutriWindow = document.querySelector('.nutri-window');
  _overlay = document.querySelector('.overlay');
  _btnClose = document.getElementById('btn--close-nutri');
  _totalCalDiv = document.querySelector('.totalCal');

  totalCal = 0;

  constructor() {
    super();

    this._addHandlerHideWindow();
  }

  openWindow() {
    this._overlay.classList.remove('hidden');
    this._nutriWindow.classList.remove('hidden');
    this.discardTimer();
    // document.querySelectorAll('.error').forEach(el => el.remove());
  }

  closeWindow() {
    this.discardTimer();
    this._overlay.classList.add('hidden');
    this._nutriWindow.classList.add('hidden');
  }

  addHandlerShowPlan(handler) {
    this._btnOpen.addEventListener(
      'click',
      function () {
        this.openWindow();

        handler();
      }.bind(this)
    );
  }

  clearIngs() {
    this._parentElement.innerHTML = '';
  }
  updateNutri(data, ing) {
    // console.log(data, ing);
    const markup = `
    <li class="nutri_list--el"><div class=nutri_list--div><span>${
      ing.quantity ? ing.quantity : ''
    } ${ing.unit} ${ing.description}</span><span class="nutri_list--cal">${
      data.calories
    } KCAL</span></div></li>
    `;
    const calories = data.calories;
    this.totalCal += calories;
    this._totalCalDiv.innerHTML = this.totalCal;
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.closeWindow.bind(this));
    this._overlay.addEventListener('click', this.closeWindow.bind(this));
  }
}

export default new NutriView();
