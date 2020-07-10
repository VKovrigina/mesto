import Popup from './Popup.js';
import {
  popupPhotoImg,
  popupPhotoTitle
} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  open(titleValue, imgValue) {
    super.open();
    popupPhotoImg.src = imgValue;
    popupPhotoImg.alt = titleValue;
    popupPhotoTitle.textContent = titleValue;
  }
}
