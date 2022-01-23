const profileEditPopup = document.querySelector('.profile-edit-popup')
const addCardPopup = document.querySelector('.add-card-popup')
const photoPopup = document.querySelector('.photo-popup')

const inpName = document.querySelector('.profile-edit-form__input_value_name')
const inpJob = document.querySelector('.profile-edit-form__input_value_description')

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

// сохранение информации в профиле
profileEditForm.addEventListener('submit', (e) => {
  e.preventDefault()
  profileName.textContent = inpName.value
  profileJob.textContent = inpJob.value
  hidePopup(profileEditPopup)
})

// установка первоначальных значений в поля формы модального окна редактирования профиля
inpName.value = profileName.textContent
inpJob.value = profileJob.textContent
