const elements = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const showInputError = (formElement, inputElement, errorMessage, elements) => {
  const errorElement = formElement.querySelector(`.popup__error_${inputElement.id}`);
  inputElement.classList.add(elements.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(elements.errorClass);
}

const hideInputError = (formElement, inputElement, elements) => {
  const errorElement = formElement.querySelector(`.popup__error_${inputElement.id}`);
  inputElement.classList.remove(elements.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(elements.errorClass);
}

const hasInvalidInput = inputList => {
  return inputList.some(input => {
    return !input.validity.valid
  })
}

const toggleButtonDisabledState = (inputList, buttonElement, elements) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(elements.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(elements.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

const isValid = (formElement, inputElement, elements) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, elements);
  } else {
    hideInputError(formElement, inputElement, elements);
  }
}

const setEventListeners = (formElement, elements) => {
  const inputList = Array.from(formElement.querySelectorAll(elements.inputSelector));
  const buttonElement = formElement.querySelector(elements.submitButtonSelector);
  toggleButtonDisabledState(inputList, buttonElement, elements);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, elements);
      toggleButtonDisabledState(inputList, buttonElement, elements);
    })
  })
}

const enableValidation = elements => {
  const formList = Array.from(document.querySelectorAll(elements.formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, elements);
  })
}

enableValidation(elements);

export {toggleButtonDisabledState, isValid, hideInputError, elements};
