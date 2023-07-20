export class Card {
  constructor({name, link}, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);

    return card;
  }

  renderCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".element__image");
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector(".element__caption").textContent = this._name;
    this._addEventListeners();

    return this._element;
  }

  _addEventListeners() {
    this._handleCardClick(this._image, this._link, this._name);
    this._removeCard();
    this._handleLike();
  }

  _removeCard() {
    this._removeButton = this._element.querySelector(".element__trash-button");
    this._removeButton.addEventListener('click', () => {
      this._element.remove();
      this._element = null;
    })
  }

  _handleLike() {
    this._likeButton = this._element.querySelector('.element__like-button');
    this._likeButton.addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__like-button_active");
    });
  }
}

