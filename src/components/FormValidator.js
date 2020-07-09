
export class FormValidator {
  constructor(options, form) {
    this._form = form;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    //привязка контекста для вызова в resetErrors
    this._toggleClassButton = this._toggleClassButton.bind(this);
    this._hideInputError = this._hideInputError.bind(this);
  };

  enableValidation() {
    this._form.addEventListener('submit', evt => this._preventFormDefault(evt));
    this._form.addEventListener('input', () => this._toggleClassButton());
    const inputElements = this._form.querySelectorAll(this._inputSelector);
    inputElements.forEach(input => {
      input.addEventListener('input', () => this._handleInput(input));
    });
  };

  _preventFormDefault(evt) {
    evt.preventDefault();
  };
  //функция переключения класса кнопки в зависимости от валидности формы.
  _toggleClassButton() {
    const hasErrors = !this._form.checkValidity();
    const submitButton = this._form.querySelector(this._submitButtonSelector);
    submitButton.disabled = hasErrors;
    submitButton.classList.toggle(this._inactiveButtonClass, hasErrors);
  };
  //проверка валидности инпутов - отображение/скрытие ошибок
  _handleInput(input) {
    if (input.checkValidity()) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  };

  _showInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
  };

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove(this._inputErrorClass);
  };

  resetErrors() {
  const inputElements = this._form.querySelectorAll(this._inputSelector);
  inputElements.forEach(input => {
    this._hideInputError(input);
  });
  this._toggleClassButton();
  }
};
