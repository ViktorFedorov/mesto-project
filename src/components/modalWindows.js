import { updateProfileData } from "./api";

const inputName = document.querySelector('.profile-edit-form__input_value_name')
const inputJob = document.querySelector('.profile-edit-form__input_value_description')
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__description')
const profileEditForm = document.querySelector('.edit-form')
const addCardPopup = document.querySelector('.add-card-popup')
const profileEditPopup = document.querySelector('.profile-edit-popup')

// закрытие модальных окон клавишей Esc
function handleEscape(e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    hidePopup(openedPopup)
  }
}

//закрытие модальных окон кликом на оверлэй
function handleMousedown(e) {
  if (e.target.classList.contains('popup')) {
    hidePopup(e.target)
  }
}

function showPopup(popup) {
  popup.classList.add('popup_opened')
  document.body.addEventListener('keydown', handleEscape)
  document.body.addEventListener('mousedown', handleMousedown)
}

function hidePopup(popup) {
  popup.classList.remove('popup_opened')

  // удаляем слушатели после закрытия
  document.body.removeEventListener('keydown', handleEscape)
  document.body.removeEventListener('mousedown', handleMousedown)
}

// сохранение информации в профиле
profileEditForm.addEventListener('submit', (e) => {
  e.preventDefault()
  updateProfileData(inputName.value, inputJob.value)
  hidePopup(profileEditPopup)
})

export {
  showPopup,
  hidePopup,
  profileEditPopup,
  addCardPopup,
  profileName,
  inputName,
  profileJob,
  inputJob
}
