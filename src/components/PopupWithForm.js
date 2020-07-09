import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, submitForm, resetErrors) {
    super(popup);
    this._submitForm = submitForm;
    this._resetErrors = resetErrors;
  }
  // собирает данные всех полей формы.
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input =>
      this._formValues[input.name] = input.value
    );
    console.log(this._formValues);
    return this._formValues;
  }
  // Метод setEventListeners класса PopupWithForm
  // должен не только добавлять обработчик клика иконке закрытия,
  // но и добавлять обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', () => {
      this._submitForm(this._getInputValues());
      this.close();
    })
  }
  // при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    this._popup.querySelector('.popup__form').reset();
    super.close();
    ///this._popup.querySelector('.popup__form').reset();
  }

  open() {
    super.open();
    this._resetErrors();
  }
}
