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
  })

}

const toggleClassButton = (formElement, submitButton, inactiveButtonClass) => {
  const hasErrors = !formElement.checkValidity();
  submitButton.disabled = hasErrors;
  submitButton.classList.toggle(inactiveButtonClass, hasErrors);
}

const handleInput = (evt, errorClass) => {
  const input = evt.target;
  const error = document.querySelector(`#${input.id}-error`);
  if (input.checkValidity()) {
    error.textContent = '';
    input.classList.remove(errorClass);
  } else {
    error.textContent = input.validationMessage;
    input.classList.add(errorClass);
  }
};



