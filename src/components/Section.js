export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderElements(initialCards) {
    initialCards.forEach((card) => {
      this._element = this._renderer(card);
      this._containerElement.append(this._element);
    });
  }

  addItem(card) {
    this._element = this._renderer(card);
    this._containerElement.prepend(this._element);
  }
}
