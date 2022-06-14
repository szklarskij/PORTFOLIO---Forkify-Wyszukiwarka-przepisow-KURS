import View from './View.js';
import icons from 'url:../../img/icons.svg';
// import { of } from 'core-js/core/array';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const pagesDisplay = `<span class="pagination__pages">${currentPage}/${numPages}</span>`;
    const emptyButton = `   <button class="btn--empty">
    <svg class="search__icon">
    <use href="${icons}#icon-arrow-left"></use>
  </svg>
    <span>Page x</span>
  </button>`;
    const lastBtn = `    <button data-goto="${numPages}" class="btn--inline">
  <span>Last</span>
</button>`;
    const lastBtnHidden = `    <button data-goto="${numPages}" class="btn--inline btn--empty">
<span>Last</span>
</button>`;
    const firstBtn = `    <button data-goto="1" class="btn--inline">
    <span>First</span>
</button>`;
    const firstBtnHidden = `    <button data-goto="1" class="btn--inline btn--empty">
<span>First</span>
</button>`;

    //page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return `
      ${firstBtnHidden}
      ${emptyButton}
      ${pagesDisplay}
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"</use>
      </svg>
    </button>
    ${lastBtn}

    `;
    }
    //last page
    if (currentPage === numPages && numPages !== 1) {
      return `
      ${firstBtn}

      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>
          ${pagesDisplay}
          ${emptyButton}
          ${lastBtnHidden}
    
    `;
    }
    //other page
    if (currentPage < numPages) {
      return `
      ${firstBtn}
      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
            ${pagesDisplay}
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    ${lastBtn}
      `;
    }
    //page 1 and there are No other pages
    return '';
  }
}

export default new PaginationView();
