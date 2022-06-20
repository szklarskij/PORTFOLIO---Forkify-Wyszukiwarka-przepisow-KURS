import View from './View.js';

class IngredientsToBuyView extends View {
  _parentElement = '';

  _generateMarkup() {
    const unit = `: ${new Fraction(this._data.quantity).toString()} ${
      this._data.unit
    }`;
    const description = capitalizeFirstLetter(
      this._data.description.toLowerCase()
    );
    function capitalizeFirstLetter(string) {
      return string[0].toUpperCase() + string.slice(1);
    }

    return `
 <li class="shopping-list__list--el">${description} ${
      this._data.quantity ? unit : ''
    }
   </li>`;
  }
}

export default new IngredientsToBuyView();
