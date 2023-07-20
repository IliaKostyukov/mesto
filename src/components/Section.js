export class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderElements(initialCards) {
    initialCards.forEach(item => {
      this._element = this._renderer(item);
      this._containerElement.append(this._element);
    });
  }

  addItem(card) {
    this._containerElement.prepend(card);
  }
}
