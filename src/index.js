import initialCards from './data/initialCards.js'
import { createCard, photoPopup } from './components/cards.js'
import { showPopup, hidePopup, profileEditPopup, addCardPopup } from "./components/modalWindows.js";
import enableValidation from "./components/forms-validation.js";
import './pages/index.css'

const gallery = document.querySelector('.gallery')
const cardTemplate = document.getElementById('card').content
const addCardForm = document.querySelector('.add-card-form')
const inputPlaceName = document.querySelector('.profile-edit-form__input_place_name')
const inputPlaceUrl = document.querySelector('.profile-edit-form__input_place_url')
const profileEditBtn = document.querySelector('.profile__edit-btn')
const addCardBtn = document.querySelector('.profile__add-btn')
const closeProfileBtn = document.querySelector('.close-profile')
const closeAddBtn = document.querySelector('.close-add')
const closePhotoBtn = document.querySelector('.close-photo')

// отрисовывем карточки из массива
initialCards.forEach((card) => {
  gallery.prepend(createCard(cardTemplate, card.link, card.name))
})

// добавление карточки при отправке формы
addCardForm.addEventListener('submit', (e) => {
  e.preventDefault()
  gallery.prepend(createCard(cardTemplate, inputPlaceUrl.value, inputPlaceName.value))

  // очищаем форму
  e.target.reset()

  // закрываем модальное окно с формой
  hidePopup(addCardPopup)
})

// открытие модальных окон
profileEditBtn.addEventListener('click', () => showPopup(profileEditPopup))
addCardBtn.addEventListener('click', () => showPopup(addCardPopup))

// закрытие модальных окон
closeProfileBtn.addEventListener('click', () => hidePopup(profileEditPopup))
closeAddBtn.addEventListener('click', () => hidePopup(addCardPopup))
closePhotoBtn.addEventListener('click', () => hidePopup(photoPopup))

// закрытие модальных окон клавишей Esc через делегирование событий
// document.body.addEventListener('keydown', (e) => {
//   if (e.key === 'Escape') {
//     hidePopup(profileEditPopup)
//     hidePopup(addCardPopup)
//     hidePopup(photoPopup)
//   }
// })

// включаем валидацию всех форм
enableValidation({
  formSelector: '.profile-edit-form',
  inputSelector: '.profile-edit-form__input',
  submitButtonSelector: '.profile-edit-form__save-btn',
  inactiveButtonClass: 'profile-edit-form__save-btn_state_disabled',
  inputErrorClass: 'input-error-enable',
  errorClass: 'description-error-enable'
})
