import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup, popupPhotoImg, popupPhotoTitle) {
    super(popup);
    this._popupPhotoTitle = popupPhotoTitle;
    this._popupPhotoImg = popupPhotoImg;
  }

  open(titleValue, imgValue) {
    super.open();
    this._popupPhotoImg.src = imgValue;
    this._popupPhotoImg.alt = titleValue;
    this._popupPhotoTitle.textContent = titleValue;
  }
}
