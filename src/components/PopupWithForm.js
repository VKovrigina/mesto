import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, { submitForm }) {
    super(popup);
    this.submitForm = submitForm;
  }
  // собирает данные всех полей формы.
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
  // Метод setEventListeners класса PopupWithForm
  // должен не только добавлять обработчик клика иконке закрытия,
  // но и добавлять обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.close();
    })
  }
  // при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    //сбросить
  }

}
