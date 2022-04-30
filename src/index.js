import { getCards, addCard } from './components/api'
import { enableValidation, toggleSubmitButton } from "./components/forms-validation"
import { getProfileData } from "./components/api"
import { renderUserInfo, setUserId } from "./components/profile"
import { renderCards } from "./components/cards"
import { profileName, profileJob } from "./components/profile"
import {
  showPopup,
  hidePopup,
  profileEditPopup,
  inputName,
  inputJob } from "./components/modalWindows"
import './pages/index.css'

const addCardPopup = document.querySelector('.add-card-popup')
const editForm = document.querySelector('.edit-form')
const addCardForm = document.querySelector('.add-card-form')
const inputPlaceName = document.querySelector('.profile-edit-form__input_place_name')
const inputPlaceUrl = document.querySelector('.profile-edit-form__input_place_url')
const profileEditBtn = document.querySelector('.profile__edit-btn')
const addCardBtn = document.querySelector('.profile__add-btn')
const popups = document.querySelectorAll('.popup')

// добавление карточки при отправке формы
addCardForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addCard(inputPlaceName.value, inputPlaceUrl.value)
    .then(renderCards)
    .catch((err => console.log(err)))

  // очищаем форму
  e.target.reset()

  toggleSubmitButton(addCardForm, {
    inactiveButtonClass: 'profile-edit-form__save-btn_state_disabled',
    submitButtonSelector: '.profile-edit-form__save-btn'
  })

  // закрываем модальное окно с формой
  hidePopup(addCardPopup)
})

// открытие модального окна редактирования профиля
profileEditBtn.addEventListener('click', () => {
  // установка первоначальных значений в поля формы
  inputName.value = profileName.textContent
  inputJob.value = profileJob.textContent

  toggleSubmitButton(editForm, {
    inactiveButtonClass: 'profile-edit-form__save-btn_state_disabled',
    submitButtonSelector: '.profile-edit-form__save-btn'
  })

  showPopup(profileEditPopup)
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
