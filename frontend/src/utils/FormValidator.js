export class FormValidator {
  constructor(validationConfig, formElement) {
    this._formElement = formElement;

    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._errorClass = validationConfig.errorClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._button = this._formElement.querySelector(this._submitButtonSelector);
  }

  //Изменение названия кнопки при загрузке
  loadingData = (isLoading) => {
    if (isLoading) {
      this._buttonDefaultValue = this._button.textContent;
      if (this._buttonDefaultValue === 'Да') {
        this._button.textContent = 'Удаление...';
      } else {
        this._button.textContent = 'Сохранение...';
      }
    } else {
      this._button.textContent = this._buttonDefaultValue;
    }
  }

  //Показать сообщение об ошибке
  _showInputMessage(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //Скрыть сообщение об ошибке
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  //Проверка на валидность
  _checkInputValidity(inputElement) {
    const isValidity = inputElement.validity.valid;
    if (isValidity) {
      this._hideInputError(inputElement);
      inputElement.classList.remove(this._inputErrorClass)
    } else {
      const errorMessage = inputElement.validationMessage;
      this._showInputMessage(inputElement, errorMessage);
      inputElement.classList.add(this._inputErrorClass);
    }
  }

  //Переключение кнопки
  _toggleButton() {
    const hasNotValid = this._inputList.some((inputElement) => !inputElement.validity.valid);
    if (hasNotValid) {
      this._button.setAttribute('disabled', true);
      this._button.classList.add(this._inactiveButtonClass)
    } else {
      this._button.removeAttribute('disabled', true);
      this._button.classList.remove(this._inactiveButtonClass)
    }
  }

  //Проверка на валидность каждого поля
  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButton()
      });
    });
    this._button.addEventListener('click', () => {
      this._toggleButton()
    });
  }

  //Скрыть старое сообщение об ошибке
  hideError() {
    const inputElements = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputElements.forEach(inputElement => {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      errorElement.textContent = '';
      errorElement.classList.remove(this._errorClass);
      inputElement.classList.remove(this._inputErrorClass);
    })
  }

  enableValidation() {
    this._setEventListeners(this._formElement)
  }

}
