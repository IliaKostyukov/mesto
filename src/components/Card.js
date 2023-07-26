export class Card {
  constructor(
    { name, link, owner, _id, likes },
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    likeHandler,
    userId
  ) {
    this._name = name;
    this._link = link;
    this._ownerId = owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._userId = userId;
    this._cardId = _id;
    this._likes = likes;
    this._addLike = likeHandler.addLike;
    this._removeLike = likeHandler.removeLike;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return card;
  }

  renderCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".element__image");
    this._image.src = this._link;
    this._image.alt = this._name;
    this._likesCounter = this._element.querySelector(".element__like-counter");
    this._likesCounter.textContent = this._likes.length;
    this._element.querySelector(".element__caption").textContent = this._name;
    this._addEventListeners();
    this._deleteRemoveButton();

    return this._element;
  }

  _addEventListeners() {
    this._handleRemoveCard();
    this._handleCardClick(this._image, this._link, this._name);
    this._handleLike();
  }

  _handleRemoveCard() {
    this._removeButton = this._element.querySelector(".element__trash-button");
    this._handleDeleteClick(this._removeButton, this._element, this._cardId);
  }

  _handleLike() {
    this._likeButton = this._element.querySelector(".element__like-button");
    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this._likeButton.classList.add("element__like-button_active");
      }
    });

    this._likeButton.addEventListener("click", () => {
      if (!this._likeButton.classList.contains("element__like-button_active")) {
        this._addLike(this._likeButton, this._likesCounter, this._cardId);
      } else {
        this._removeLike(this._likeButton, this._likesCounter, this._cardId);
      }
    });
  }

  _deleteRemoveButton() {
    if (this._userId !== this._ownerId) {
      this._removeButton.remove();
    }
  }
}
