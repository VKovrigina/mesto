export class FormValidator {
  constructor(options, form) {
    this._form = form;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
  };

  enableValidation() {
    this._form.addEventListener('submit', evt => this._preventFormDefault(evt));
    this._form.addEventListener('input', () => this.toggleClassButton(this._form, this._submitButtonSelector, this._inactiveButtonClass));
    const inputElements = this._form.querySelectorAll(this._inputSelector);
    inputElements.forEach(input => {
      input.addEventListener('input', () => this._handleInput(input));
    });
  };

  _preventFormDefault(evt) {
    evt.preventDefault();
  };
  //функция переключения класса кнопки в зависимости от валидности формы.
  //Делаю метод публичным, так как потребуется при открытии попапа с формой
  toggleClassButton(formElement, submitButtonClass, inactiveButtonClass) {
    const hasErrors = !formElement.checkValidity();
    const submitButton = formElement.querySelector(submitButtonClass);
    submitButton.disabled = hasErrors;
    submitButton.classList.toggle(inactiveButtonClass, hasErrors);
  };
  //проверка валидности инпутов - отображение/скрытие ошибок
  _handleInput(input) {
    if (input.checkValidity()) {
      this.hideInputError(input);
    } else {
      this._showInputError(input);
    }
  };

  _showInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
  };
  //Делаю метод публичным, так как потребуется при открытии попапа с формой
  hideInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove(this._inputErrorClass);
  };
};