const inputName = document.querySelector('.profile-edit-form__input_value_name')
const inputJob = document.querySelector('.profile-edit-form__input_value_description')
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__description')
const profileEditForm = document.querySelector('.edit-form')
const profileEditPopup = document.querySelector('.profile-edit-popup')


function showPopup(popup) {
  popup.classList.add('popup_opened')
}

function hidePopup(popup) {
  popup.classList.remove('popup_opened')
}

// закрытие модальных окон кликом по оверлэю через делегирование событий
document.body.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('popup')) {
    hidePopup(e.target)
  }
})

// сохранение информации в профиле
profileEditForm.addEventListener('submit', (e) => {
  e.preventDefault()
  profileName.textContent = inputName.value
  profileJob.textContent = inputJob.value
  hidePopup(profileEditPopup)
})

// установка первоначальных значений в поля формы модального окна редактирования профиля
inputName.value = profileName.textContent
inputJob.value = profileJob.textContent

export {
  showPopup,
  hidePopup,
  profileEditPopup
}