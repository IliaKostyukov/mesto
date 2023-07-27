export class Card {
  constructor(
    { name, link, owner, _id, likes },
    userId,
    templateSelector,
    { handleFigureCard, handleDeleteCard, handleLike }
  ) {
    this._name = name;
    this._link = link;
    this._ownerId = owner._id;
    this._templateSelector = templateSelector;
    this._handleFigureCard = handleFigureCard;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLike = handleLike;
    this._userId = userId;
    this._cardId = _id;
    this._likes = likes;
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
    this._likesCounter = this._element.querySelector(".element__like-counter");
    this._removeButton = this._element.querySelector(".element__trash-button");
    this._likeButton = this._element.querySelector(".element__like-button");
    this._caption = this._element.querySelector(".element__caption");
    this._image.src = this._link;
    this._image.alt = this._name;
    this._likesCounter.textContent = this._likes.length;
    this._caption.textContent = this._name;
    this._addEventListeners();
    this._deleteRemoveButton();
    this._addLikeActiveClass();

    return this._element;
  }

  _addEventListeners() {
    this._handleDeleteButtonClick();
    this._handleFigureClick();
    this._handleLikeClick();
  }

  _deleteRemoveButton() {
    if (this._userId !== this._ownerId) {
      this._removeButton.remove();
    }
  }

  _handleDeleteButtonClick() {
    this._removeButton.addEventListener('click', () => {
      this._handleDeleteCard(this._element, this._cardId);
    })
  }

  _handleFigureClick() {
    this._image.addEventListener('click', () => {
      this._handleFigureCard()
    })
  }

  _handleLikeClick() {
    this._likeButton.addEventListener("click", () => {
      this._handleLike();
    });
  }

  addLike(likes) {
    this._likeButton.classList.add("element__like-button_active");
    this._likesCounter.textContent = likes;
  }

  removeLike(likes) {
    this._likeButton.classList.remove("element__like-button_active");
    this._likesCounter.textContent = likes;
  }

  _checkForOwnLike() {
    return this._likes.find((user) => this._userId === user._id);
  }

  _addLikeActiveClass() {
    if (this._checkForOwnLike()) {
      this._likeButton.classList.add("element__like-button_active");
    }
  }

  isLiked() {
    return this._likeButton.classList.contains("element__like-button_active");
  }
}
