import { createCard, getCards, gallery, cardTemplate } from './components/cards.js'
import { enableValidation, toggleSubmitButton } from "./components/forms-validation.js"
import { getProfileData } from "./components/profile"
import {
  showPopup,
  hidePopup,
  profileEditPopup,
  addCardPopup,
  profileName,
  inputName,
  profileJob,
  inputJob } from "./components/modalWindows.js"
import './pages/index.css'

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
  gallery.prepend(createCard(cardTemplate, inputPlaceUrl.value, inputPlaceName.value))

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

// загрузка карточек
getCards()

// включаем валидацию всех форм
enableValidation({
  formSelector: '.profile-edit-form',
  inputSelector: '.profile-edit-form__input',
  submitButtonSelector: '.profile-edit-form__save-btn',
  inactiveButtonClass: 'profile-edit-form__save-btn_state_disabled',
  inputErrorClass: 'input-error-enable',
  errorClass: 'description-error-enable'
})
