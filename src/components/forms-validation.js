// изменение состояния кнопки отправки формы в зависимости от валидности формы
function toggleSubmitButton(formElement, settings) {
  const submitButton = formElement.querySelector(settings.submitButtonSelector)

  if (!formElement.checkValidity()) {
    submitButton.setAttribute('disabled', 'disabled')
    submitButton.classList.add(settings.inactiveButtonClass)
  } else {
    submitButton.removeAttribute('disabled')
    submitButton.classList.remove(settings.inactiveButtonClass)
  }
}

// показать ошибку валидации
function showError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  inputElement.classList.add(settings.inputErrorClass)
  errorElement.classList.add(settings.errorClass)
  errorElement.textContent = errorMessage
}

// скрыть ошибку валидации
function hideError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  inputElement.classList.remove(settings.inputErrorClass)
  errorElement.classList.remove(settings.errorClass)
  errorElement.textContent = ''
}

// валидация одного поля ввода
function isValid(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, settings)
  } else {
    hideError(formElement, inputElement, settings)
  }
}

// подвешиваем валидацию на все поля формы
function setEventListeners(formElement, settings) {
  const inputList = [...formElement.querySelectorAll(settings.inputSelector)]

  toggleSubmitButton(formElement, settings)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, settings)
      toggleSubmitButton(formElement, settings)
    })
  })
}

// включаем валидацию для всех форм и отключаем стандартное поведение
function enableValidation(settings) {
  const formList = [...document.querySelectorAll(settings.formSelector)]

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => e.preventDefault())
    setEventListeners(formElement, settings)
  })
}

export {
  enableValidation,
  toggleSubmitButton
}
