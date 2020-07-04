export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._handleClickClose = this._handleClickClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_open');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_open');
    this.removeEventListeners();
  }

  _handleEscClose(evt) {
    console.log(evt);
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickClose(evt) {
    console.log(evt);
    if(evt.target.classList.contains('popup_open') || evt.target.classList.contains('popup__close-button')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._handleClickClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  removeEventListeners() {
    this._popup.removeEventListener('click', this._handleClickClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
