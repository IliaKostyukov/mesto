export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    document.addEventListener('keydown', this._handleEscButton.bind(this));
    this._popup.classList.add('popup_active');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscButton.bind(this));
    this._popup.classList.remove('popup_active');
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscButton.bind(this));
    this._popup.addEventListener('mousedown', (evt) => {
      if (
        evt.target === evt.currentTarget ||
        evt.target.classList.contains("popup__close-button")
      ) {
        this.close(this._popup);
      }
    })
  }

  _handleEscButton(evt) {
    if (evt.key.toLowerCase() === "escape") {
      this.close()
    }
  }
}

