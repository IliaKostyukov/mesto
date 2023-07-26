import { Popup } from "./Popup.js";

export class PopupConfirm extends Popup {
  constructor(popupSelector, handleDelete) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleDelete = handleDelete;
  }

  open(elementToDelete, cardId) {
    this._elementToDelete = elementToDelete;
    this._cardId = cardId;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDelete(this._elementToDelete, this._cardId);
    });
  }
}
