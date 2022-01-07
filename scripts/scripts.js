const popup = document.querySelector('.popup')
const profile = document.querySelector('.profile')
const editBtn = profile.querySelector('.profile__edit-btn')
const closeBtn = popup.querySelector('.popup__close-btn')
const profileName = profile.querySelector('.profile__name')
const profileDescription = profile.querySelector('.profile__description')
const inputName = popup.querySelector('.profile-edit-form__input_value_name')
const inputDescription = popup.querySelector('.profile-edit-form__input_value_description')
const profileEditForm = popup.querySelector('.profile-edit-form')

// показывает модальное окно редактирования профиля
editBtn.addEventListener('click', function() {
  popup.classList.add('popup_opened')
  inputName.value = profileName.textContent
  inputDescription.value = profileDescription.textContent
})

// закрывает модальное окно
closeBtn.addEventListener('click', function() {
  popup.classList.remove('popup_opened')
})

// сохранение информации в профиле
profileEditForm.addEventListener('submit', function(e) {
  e.preventDefault()
  profileName.textContent = inputName.value
  profileDescription.textContent = inputDescription.value
  popup.classList.remove('popup_opened')
})
