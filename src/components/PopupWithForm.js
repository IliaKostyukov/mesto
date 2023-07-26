import { data } from "autoprefixer";
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._handleSubmitForm = handleSubmitForm;
    this._saveButton = this._form.querySelector(".popup__save-button");
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(state) {
    if (state) {
      this._saveButton.textContent = "Сохранение...";
    } else {
      this._saveButton.textContent = "Сохранить";
    }
  }
}
