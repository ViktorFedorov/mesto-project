import { getCards, addCard, updateAvatar, updateProfileData } from './components/api'
import { enableValidation, toggleSubmitButton } from "./components/forms-validation"
import { getProfileData } from "./components/api"
import { renderUserInfo, setUserId } from "./components/profile"
import { renderCards } from "./components/cards"
import { checkResponse } from "./utils/utils";
import { profileName, profileJob } from "./components/profile"
import { showPopup, hidePopup } from "./components/modalWindows"
import './pages/index.css'

const addCardPopup = document.querySelector('.add-card-popup')
const editForm = document.querySelector('.edit-form')
const addCardForm = document.querySelector('.add-card-form')
const inputPlaceName = document.querySelector('.profile-edit-form__input_place_name')
const inputPlaceUrl = document.querySelector('.profile-edit-form__input_place_url')
const profileEditBtn = document.querySelector('.profile__edit-btn')
const avatarEditBtn = document.querySelector('.profile__image-edit-btn')
const addCardBtn = document.querySelector('.profile__add-btn')
const popups = document.querySelectorAll('.popup')
const profileEditPopup = document.querySelector('.profile-edit-popup')
const avatarEditPopup = document.querySelector('.avatar-edit-popup')
const inputName = document.querySelector('.profile-edit-form__input_value_name')
const inputJob = document.querySelector('.profile-edit-form__input_value_description')
const profileEditForm = document.querySelector('.edit-form')
const avatarEditForm = document.querySelector('.avatar-edit-form')
const settingsForDisableSendButton = {
  inactiveButtonClass: 'profile-edit-form__save-btn_state_disabled',
  submitButtonSelector: '.profile-edit-form__save-btn'
}

// добавление карточки при отправке формы
addCardForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addCard(inputPlaceName.value, inputPlaceUrl.value)
    .then(renderCards)
    .catch((err => console.log(err)))

  e.target.reset()
  toggleSubmitButton(addCardForm, settingsForDisableSendButton)
  hidePopup(addCardPopup)
})

// сохранение информации в профиле
profileEditForm.addEventListener('submit', (e) => {
  e.preventDefault()

  updateProfileData(inputName.value, inputJob.value)
    .then(checkResponse)
    .then(renderUserInfo)
    .catch(err => console.log(err))

  hidePopup(profileEditPopup)
})

// обновление аватара
avatarEditForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const avatarUrl = e.target.querySelector('.profile-edit-form__input_avatar_url').value

  updateAvatar(avatarUrl)
    .then(renderUserInfo)
    .catch(err => console.log(err))

  e.target.reset()
  toggleSubmitButton(e.target, settingsForDisableSendButton)
  hidePopup(avatarEditPopup)
})

// открытие модального окна редактирования профиля
profileEditBtn.addEventListener('click', () => {
  // установка первоначальных значений в поля формы
  inputName.value = profileName.textContent
  inputJob.value = profileJob.textContent

  toggleSubmitButton(editForm, settingsForDisableSendButton)
  showPopup(profileEditPopup)
})

// открытие модального окна редактирования аватара
avatarEditBtn.addEventListener('click', () => {
  showPopup(avatarEditPopup)
})

// открытие модального окна добавления карточки
addCardBtn.addEventListener('click', () => showPopup(addCardPopup))

// закрытие модальных окон
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (e) => {
    if (popup.classList.contains('popup_opened') && e.target.classList.contains('popup__close-btn')) {
      hidePopup(popup)
    }
  })
})

// загружаем инфо о профиле с сервера
getProfileData()
  .then(setUserId)
  .then(renderUserInfo)
  .catch(err => console.log(err))

// загружаем карточки
getCards()
  .then(renderCards)
  .catch((err => console.log(err)))

// включаем валидацию всех форм
enableValidation({
  formSelector: '.profile-edit-form',
  inputSelector: '.profile-edit-form__input',
  submitButtonSelector: '.profile-edit-form__save-btn',
  inactiveButtonClass: 'profile-edit-form__save-btn_state_disabled',
  inputErrorClass: 'input-error-enable',
  errorClass: 'description-error-enable'
})
