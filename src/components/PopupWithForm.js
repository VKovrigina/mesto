import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, submitForm, resetErrors) {
    super(popup);
    this._submitForm = submitForm;
    this._resetErrors = resetErrors;
  }
  //функция собирает данные всех полей формы.
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input =>
      this._formValues[input.name] = input.value
    );
    console.log(this._formValues);
    return this._formValues;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', () => {
      this._submitForm(this._getInputValues());
      this.close();
    })
  }
  
  close() {
    this._popup.querySelector('.popup__form').reset();
    super.close();
  }

  open() {
    this._resetErrors();
    super.open();
  }
}
