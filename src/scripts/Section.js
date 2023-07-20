export class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderElements() {
    this._items.forEach(item => {
      this._element = this._renderer(item);
      this._containerElement.append(this._element);
    });
  }

  addItem(card) {
    this._containerElement.prepend(card);
  }
}
