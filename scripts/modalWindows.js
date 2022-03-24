const profileEditPopup = document.querySelector('.profile-edit-popup')
const addCardPopup = document.querySelector('.add-card-popup')
const photoPopup = document.querySelector('.photo-popup')

const photoPopupImage = photoPopup.querySelector('.popup__photo')
const photoPopupLabel = photoPopup.querySelector('.popup__label')

const inputName = document.querySelector('.profile-edit-form__input_value_name')
const inputJob = document.querySelector('.profile-edit-form__input_value_description')

const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__description')

const profileEditBtn = document.querySelector('.profile__edit-btn')
const addCardBtn = document.querySelector('.profile__add-btn')
const closeProfileBtn = document.querySelector('.close-profile')
const closeAddBtn = document.querySelector('.close-add')
const closePhotoBtn = document.querySelector('.close-photo')

const profileEditForm = document.querySelector('.edit-form')

function showPopup(popup) {
  popup.classList.add('popup_opened')
}

function hidePopup(popup) {
  popup.classList.remove('popup_opened')
}

// открытие модальных окон
profileEditBtn.addEventListener('click', () => showPopup(profileEditPopup))
addCardBtn.addEventListener('click', () => showPopup(addCardPopup))

// закрытие модальных окон
closeProfileBtn.addEventListener('click', () => hidePopup(profileEditPopup))
closeAddBtn.addEventListener('click', () => hidePopup(addCardPopup))
closePhotoBtn.addEventListener('click', () => hidePopup(photoPopup))

// закрытие модальных окон кликом по оверлэю через делегирование событий
document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup')) {
    hidePopup(e.target)
  }
})

// закрытие модальных окон клавишей Esc через делегирование событий
document.body.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hidePopup(profileEditPopup)
    hidePopup(addCardPopup)
    hidePopup(photoPopup)
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
