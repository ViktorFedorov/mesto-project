import { profileName, profileJob } from "./modalWindows"

// отображение информации о профиле пользователя в DOM
function renderUserInfo({ name, about, avatar }) {
  const profileImage = document.querySelector('.profile__image')
  profileImage.src = avatar
  profileName.textContent = name
  profileJob.textContent = about
}

// получение информации о пользователе
function getProfileData() {
  fetch('https://mesto.nomoreparties.co/v1/plus-cohort-9/users/me', {
    method: 'GET',
    headers: {
      authorization: 'cfb5467c-bf03-4f53-98d0-54d36791533e'
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
      return res.json()
    })
    .then(renderUserInfo)
    .catch(err => console.log(err))
}

export {
  getProfileData
}
