import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._figureImage = document.querySelector(".popup__image");
    this._figureCaption = document.querySelector(".popup__caption");
  }

  open(link, name) {
    document.addEventListener('keydown', super._handleEscButton.bind(this));
    this._figureImage.src = link;
    this._figureImage.alt = name;
    this._figureCaption.textContent = name;
  }
}
