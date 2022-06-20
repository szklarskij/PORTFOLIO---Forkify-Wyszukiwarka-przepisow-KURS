import icons from 'url:../../img/icons.svg';
import { MODAL_CLOSE_SEC, COUNTER } from '../config.js';

export default class View {
  _data;

  /**
   * Render the recived object to the DOM
   * @param {Object | Object[]} data The data to be rendered
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render = false
   * @this {Object} View instance
   * @author Jakub Szklarski
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    // console.log(`render' ${data}`);
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //updates changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      //update changed attributes
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner(clear = true) {
    // console.log(parentEl);
    const markup = `
    <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
          `;
    if (clear === true) this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage, clear = true) {
    const markup = `<div class="error">
  <div>
    <svg>
      <use href="${icons}#icon-alert-triangle"></use>
    </svg>
  </div>
  <p>${message}</p>
</div>`;
    if (clear === true) {
      this._clear();
    } else {
      document.querySelectorAll('.spinner').forEach(el => el.remove());
    }
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message, clear = true) {
    const markup = `<div class="error">
  <div class="message">
    <svg>
      <use href="${icons}#icon-smile"></use>
    </svg>
    <p>${message}</p>
  </div>
</div>`;
    if (clear === true) {
      this._clear();
    } else {
      document.querySelectorAll('.spinner').forEach(el => el.remove());
    }
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  showAlert(message = this._message) {
    const windowAlert = document.querySelector('.alert-window');
    const overlay = document.querySelector('.overlay');

    const markup = `  <div class="message">
    <svg>
      <use href="${icons}#icon-smile"></use>
    </svg>
    <p>${message}</p>
  </div>
</div>`;
    overlay.classList.remove('hidden');

    windowAlert.classList.remove('hidden');
    windowAlert.textContent = '';
    windowAlert.insertAdjacentHTML('afterbegin', markup);
    setTimeout(function () {
      overlay.classList.add('hidden');
      windowAlert.classList.add('hidden');
    }, MODAL_CLOSE_SEC * 750);

    // document.querySelector('.alert-msg').textContent('message');
    // document.querySelector
  }
}

//////////////////////////PRZENIESC COUNTER DO VIEW I TAM DZIALAC
