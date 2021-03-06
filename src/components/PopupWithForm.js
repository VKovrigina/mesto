import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, submitForm, resetErrors) {
    super(popup);
    this._submitForm = submitForm;
    this._resetErrors = resetErrors;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input =>
      this._formValues[input.name] = input.value
    );
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', () => {
      this._submitForm(this._getInputValues());
    })
  }

  close() {
    this._popup.querySelector('.popup__form').reset();
    super.close();
  }

  open() {
    this._resetErrors();
    super.open();
    this._popup.querySelector('.popup__form-button').textContent = 'Сохранить'
  }

  renderLoading(isLoading) {
    isLoading
    ? this._popup.querySelector('.popup__form-button').textContent = 'Сохранение...'
    : this.close();
  }
}
