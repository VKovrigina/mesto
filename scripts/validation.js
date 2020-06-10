function enableValidation(options) {
  const formElements = Array.from(document.querySelectorAll(options.formSelector));
  formElements.forEach(formElement => {

    const inputElements = formElement.querySelectorAll(options.inputSelector);
    const submitButton = formElement.querySelector(options.submitButtonSelector);

    inputElements.forEach(input => {
      input.addEventListener('input', evt => handleInput(evt, options.inputErrorClass))
    })

    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    })

    formElement.addEventListener('input', () => toggleClassButton(formElement, submitButton, options.inactiveButtonClass));
  })
}

const toggleClassButton = (formElement, submitButton, inactiveButtonClass) => {
  const hasErrors = !formElement.checkValidity();
  submitButton.disabled = hasErrors;
  if (hasErrors) {
    !submitButton.classList.contains(inactiveButtonClass)
    ? submitButton.classList.add(inactiveButtonClass) : 0;
  } else {
    submitButton.classList.contains(inactiveButtonClass)
    ? submitButton.classList.remove(inactiveButtonClass) : 0;
  }
  //submitButton.classList.toggle(inactiveButtonClass, hasErrors);
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



