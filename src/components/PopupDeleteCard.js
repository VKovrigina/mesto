import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(popup) {
    super(popup);
    this._button = this._popup.querySelector('.popup__form-button');
  }

  setHandleSubmit(submitForm) {
    this._handleSubmit = submitForm;
  }

  _preventFormDefault(evt) {
    evt.preventDefault();
  };

  open() {
    super.open();
    this._button.focus();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      this._preventFormDefault(evt);
      this._handleSubmit();
      this.close();
    })
  }
}
