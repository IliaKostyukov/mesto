const elements = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

class FormValidator {
  constructor (elements, form) {
    this._form = form;
    this._inputList = Array.from(form.querySelectorAll(elements.inputSelector));
    this._buttonElement = form.querySelector(elements.submitButtonSelector);
    this._inactiveButtonClass = elements.inactiveButtonClass;
    this._inputErrorClass = elements.inputErrorClass;
    this._errorClass = elements.errorClass;
  }

  _showInputError(input, errorMessage) {
    const errorElement = this._form.querySelector(
      `.popup__error_${input.id}`
    );
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(
      `.popup__error_${input.id}`
    );
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  toggleButtonDisabledState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _setEventListeners() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this.toggleButtonDisabledState();
      })
    })
  }

  checkInputValidity() {
    this._inputList.forEach(input => {
      this._isValid(input);
    })
  }

  resetError() {
    this._inputList.forEach(input => {
      this._hideInputError(input);
    })
  }

  resetForm() {
    this._form.reset();
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export { FormValidator, elements };

