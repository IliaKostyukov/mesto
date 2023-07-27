export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscButton = this._handleEscButton.bind(this);
  }

  open() {
    document.addEventListener("keydown", this._handleEscButton);
    this._popup.classList.add("popup_active");
  }

  close() {
    document.removeEventListener("keydown", this._handleEscButton);
    this._popup.classList.remove("popup_active");
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target === evt.currentTarget ||
        evt.target.classList.contains("popup__close-button")
      ) {
        this.close();
      }
    });
  }

  _handleEscButton(evt) {
    if (evt.key.toLowerCase() === "escape") {
      this.close();
    }
  }
}
