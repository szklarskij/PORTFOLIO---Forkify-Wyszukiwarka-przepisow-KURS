import View from './View.js';
import icons from 'url:../../img/icons.svg';
import previewShoppingView from './previewShoppingView.js';
import planPreviewView from './planPreviewView.js';

class PlanView extends View {
  _parentElement = document.querySelector('.plan__list');
  _overlay = document.querySelector('.overlay');
  _windowPlan = document.querySelector('.plan-window');
  _btnOpen = document.querySelector('.nav__btn--plan');
  _btnClose = document.getElementById('btn--close-plan');
  _btnClear = document.querySelector('.clear__btn');
  _btnCopy = document.querySelector('.copy__btn');

  constructor() {
    super();

    this._addHandlerHideWindow();
    this._addHandlerCopyPlan();
  }
  closeWindow() {
    this.discardTimer();
    this._overlay.classList.add('hidden');
    this._windowPlan.classList.add('hidden');
    document.querySelector('.alert-window').classList.add('hidden');
  }
  openWindow() {
    this._overlay.classList.remove('hidden');
    this._windowPlan.classList.remove('hidden');
    this._parentElement.classList.remove('hiddenNoDisplay');
    this.discardTimer();
    // document.querySelectorAll('.error').forEach(el => el.remove());
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
  addHandlerDeleteRecipe(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.plan__closeBtn');
      if (!btn) return;
      const dayId = btn.dataset.id;
      console.log(dayId);
      handler(dayId);
    });
  }
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.closeWindow.bind(this));
    this._overlay.addEventListener('click', this.closeWindow.bind(this));
  }

  _addHandlerCopyPlan() {
    this._windowPlan.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('.plan__btn--copy');
        if (!btn) return;
        let text = [];

        this._parentElement
          .querySelectorAll('.plan__recipes')
          .forEach((el, index) => {
            if (el.children[1].children[0].textContent !== 'Empty') {
              const textLine = `${el.children[0].children[1].textContent}: ${el.children[1].children[0].children[1].children[0].textContent} - ${el.children[1].children[0].children[1].children[1].textContent}`;

              text.push(textLine);
            }
          });

        let textToCopy = '';
        text.forEach(text => {
          textToCopy = textToCopy + text + `\n`;
        });
        textToCopy = `Recipe plan:\n${textToCopy}`;

        navigator.clipboard.writeText(textToCopy.trim());
        this.closeWindow();
        this.showAlert('Recipe plan copied to clipboard!');
        console.log(text);
      }.bind(this)
    );
  }
  addHandlerAddToShoppingList(handler) {
    this._windowPlan.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('.plan__btn--list');
        if (!btn) return;

        let ids = [];
        this._parentElement
          .querySelectorAll('.plan__recipes')
          .forEach((el, index) => {
            if (el.children[1].children[0].textContent !== 'Empty') {
              const dayId = el.children[0].children[1].textContent;

              ids.push(dayId);
            }
          });
        this.closeWindow();
        this.showAlert('All ingredients added to the shopping list!');
        handler(ids);
      }.bind(this)
    );
  }
  _generateMarkup() {
    // console.log(this._data.days);
    if (this._data.days) {
      return this._data.days
        .map(result => planPreviewView.render(result, false))
        .join('');
    } else {
      this.closeWindow();
      this.showAlert(
        'Your plan is empty! Assign recipes by clicking on calendar icon at certain recipe!'
      );
    }

    //     ` <ul class="plan__list">
    //  <li class="plan__field"><span class="plan_field--data">${
    //    this._data.days[0].dayId
    //  }</span>
    // Today${
    //       this._data.days[0].recipe.length === 0
    //         ? ''
    //         : `: <span class="days_field--recipe">${previewView.render(
    //             this._data.days[0].recipe[0]
    //           )}</span>`
    //     }</li>

    //  </ul>`;

    // this._element = this._data.forEach(el => {
    // `<li class="shopping-list__list--el">${el.description}: ${el.quantity} ${el.unit}</li>`;
    // console.log(this._element);
    // });
    // return this._element;
  }
}

export default new PlanView();
