// изменение состояния кнопки отправки формы в зависимости от валидности формы
function toggleSubmitButton(formElement) {
  const submitButton = formElement.querySelector('.profile-edit-form__save-btn')

  if (!formElement.checkValidity()) {
    submitButton.setAttribute('disabled', 'disabled')
    submitButton.classList.add('profile-edit-form__save-btn_state_disabled')
  } else {
    submitButton.removeAttribute('disabled')
    submitButton.classList.remove('profile-edit-form__save-btn_state_disabled')
  }
}

// показать ошибку валидации
function showError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  inputElement.classList.add('input-error-enable')
  errorElement.classList.add('description-error-enable')
  errorElement.textContent = errorMessage
}

// скрыть ошибку валидации
function hideError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  inputElement.classList.remove('input-error-enable')
  errorElement.classList.remove('description-error-enable')
  errorElement.textContent = ''
}

// валидация одного поля ввода
function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideError(formElement, inputElement)
  }
}

// подвешиваем валидацию на все поля формы
function setEventListeners(formElement) {
  const inputList = [...formElement.querySelectorAll('.profile-edit-form__input')]

  toggleSubmitButton(formElement)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
      toggleSubmitButton(formElement)
    })
  })
}

// включаем валидацию для всех форм и отключаем стандартное поведение
export default function() {
  const formList = [...document.querySelectorAll('.profile-edit-form')]

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => e.preventDefault())
    setEventListeners(formElement)
  })
}
