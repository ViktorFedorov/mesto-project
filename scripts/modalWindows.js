const profileEditPopup = document.querySelector('.profileEditPopup')
const addCardPopup = document.querySelector('.addCardPopup')

const inpName = document.querySelector('.profile-edit-form__input_value_name')
const inpJob = document.querySelector('.profile-edit-form__input_value_description')

const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__description')

const profileEditBtn = document.querySelector('.profile__edit-btn')
const addCardBtn = document.querySelector('.profile__add-btn')
const closePopupBtns = document.querySelectorAll('.popup__close-btn')

const profileEditForm = document.querySelector('.edit-form')

function showPopup(popup) {
  popup.classList.add('popup_opened')
}

function hidePopup() {
  profileEditPopup.classList.remove('popup_opened')
  addCardPopup.classList.remove('popup_opened')
}

// установка первоначальных значений в поля формы модального окна редактирования профиля
inpName.value = profileName.textContent
inpJob.value = profileJob.textContent

// открытие модальных окон
profileEditBtn.addEventListener('click', () => showPopup(profileEditPopup))
addCardBtn.addEventListener('click', () => showPopup(addCardPopup))

// закрытие модальных окон
for (const btn of closePopupBtns) {
  btn.addEventListener('click', hidePopup)
}

// сохранение информации в профиле
profileEditForm.addEventListener('submit', (e) => {
  e.preventDefault()
  profileName.textContent = inpName.value
  profileJob.textContent = inpJob.value
  hidePopup()
})

