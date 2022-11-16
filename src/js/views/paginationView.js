import icons from "url:../../img/icons.svg";
import View from "./View";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");

      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 and other pages
    if (this._data.page === 1 && numPages > 1) {
      return this._generateMarkupNextButton();
    }
    // Last Page
    if (this._data.page === numPages && numPages > 1) {
      return this._generateMarkupPrevButton();
    }
    // Other Page
    if (this._data.page < numPages) {
      return (
        this._generateMarkupPrevButton() + this._generateMarkupNextButton()
      );
    }
    // Page 1 and no other pages
    return "";
  }

  _generateMarkupPrevButton() {
    return `<button data-goto="${
      this._data.page - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._data.page - 1}</span>
      </button>`;
  }
  _generateMarkupNextButton() {
    return `<button data-goto="${
      this._data.page + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${this._data.page + 1}</span>
      <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
      </svg>
      </button>`;
  }
}

export default new PaginationView();
