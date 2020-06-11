function enableValidation(options) {
  const formElements = Array.from(document.querySelectorAll(options.formSelector));
  formElements.forEach(formElement => {

    const inputElements = formElement.querySelectorAll(options.inputSelector);

    inputElements.forEach(input => {
      input.addEventListener('input', evt => handleInput(evt, options.inputErrorClass))
    })

    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    })

    formElement.addEventListener('input', () => toggleClassButton(formElement, options.submitButtonSelector, options.inactiveButtonClass));
  })
}

const toggleClassButton = (formElement, submitButtonClass, inactiveButtonClass) => {
  const hasErrors = !formElement.checkValidity();
  const submitButton = formElement.querySelector(submitButtonClass);
  submitButton.disabled = hasErrors;
  submitButton.classList.toggle(inactiveButtonClass, hasErrors);
}

const handleInput = (evt, inputErrorClass) => {
  const input = evt.target;
  if (input.checkValidity()) {
    hideInputError(input, inputErrorClass);
  } else {
    showInputError(input, inputErrorClass);
  }
};

const showInputError = (input, inputErrorClass) => {
  const errorElement = document.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  input.classList.add(inputErrorClass);
}

const hideInputError = (input, inputErrorClass) => {
  const errorElement = document.querySelector(`#${input.id}-error`);
  errorElement.textContent = '';
  input.classList.remove(inputErrorClass);
}



