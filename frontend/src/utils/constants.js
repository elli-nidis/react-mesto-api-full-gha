//объект с селекторами
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  errorField: '.popup__error',
};

//объект с настройками api
const apiConfig = {
  baseUrl: 'http://localhost:4000',
}

export {validationConfig, apiConfig};