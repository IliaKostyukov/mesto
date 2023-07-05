export class Card {
  constructor(data, templateSelector, openCardAction) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openCard = openCardAction;
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
    this._openPopupHandler();
    this._removeCard();
    this._likeAction();
  }

  _openPopupHandler() {
    this._openCard(this._name, this._link, this._image);
  }

  _removeCard() {
    this._removeButton = this._element.querySelector(".element__trash-button");
    this._removeButton.addEventListener('click', () => {
      this._element.remove();
      this._element = null;
    })
  }

  _likeAction() {
    this._likeButton = this._element.querySelector('.element__like-button');
    this._likeButton.addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__like-button_active");
    });
  }
}


