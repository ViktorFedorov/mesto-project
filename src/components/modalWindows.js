import { updateProfileData } from "./api"
import { checkResponse } from "../utils/utils"
import { renderUserInfo } from "./profile"

const inputName = document.querySelector('.profile-edit-form__input_value_name')
const inputJob = document.querySelector('.profile-edit-form__input_value_description')
const profileEditForm = document.querySelector('.edit-form')
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
    .then(checkResponse)
    .then(renderUserInfo)
    .catch(err => console.log(err))

  hidePopup(profileEditPopup)
})

export {
  showPopup,
  hidePopup,
  profileEditPopup,
  inputName,
  inputJob
}
