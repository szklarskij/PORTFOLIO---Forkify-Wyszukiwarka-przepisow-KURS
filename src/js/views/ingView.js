import View from './View.js';
import icons from 'url:../../img/icons.svg';

class IngView extends View {
  _parentElement = '';

  _generateMarkup() {
    const data = JSON.stringify(this._data);

    return `

    <li class="upload__list--item" data-ing=${data}>
${this._data.description.replace('_', ' ')} ${this._data.quantity.replace(
      '_',
      ' '
    )} ${this._data.unit.replace('_', ' ')} 
    </li>
    `;
  }
}

export default new IngView();
