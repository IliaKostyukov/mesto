import { data } from 'autoprefixer';
import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    return {
      [this._inputList[0].id]: this._inputList[0].value,
      [this._inputList[1].id]: this._inputList[1].value
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (
        evt.target === evt.currentTarget ||
        evt.target.classList.contains("popup__close-button")
      ) {
        this.close(this._popup);
      }
    })
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    })
  }

  close() {
    document.removeEventListener('keydown', super._handleEscButton.bind(this));
    this._popup.classList.remove('popup_active');
    this._form.reset();
  }
}
