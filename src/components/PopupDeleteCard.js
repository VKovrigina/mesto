import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(popup) {
    super(popup)
  }

  setHandleSubmit(submitForm) {
    this._handleSubmit = submitForm;
  }

  _preventFormDefault(evt) {
    evt.preventDefault();
  };

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      this._preventFormDefault(evt);
      this._handleSubmit();
      this.close();
    })
  }
}
