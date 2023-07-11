export class Card {
  constructor(data, templateSelector, openCard) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openCard = openCard;
    this._popupFigure = document.querySelector(".popup_type_figure");
    this._figureImage = document.querySelector(".popup__image");
    this._figureCaption = document.querySelector(".popup__caption");
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
    this._handlePopupFigure();
    this._removeCard();
    this._handleLike();
  }

  _handlePopupFigure() {
    this._image.addEventListener('click', () => {
      this._figureImage.src = this._link;
      this._figureImage.alt = this._name;
      this._figureCaption.textContent = this._name;
      this._openCard(this._popupFigure);
    })
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


