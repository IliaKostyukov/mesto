import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._figureImage = this._popup.querySelector(".popup__image");
    this._figureCaption = this._popup.querySelector(".popup__caption");
  }

  open(link, name) {
    super.open();
    this._figureImage.src = link;
    this._figureImage.alt = name;
    this._figureCaption.textContent = name;
  }
}
