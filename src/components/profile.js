import { profileName, profileJob } from "./modalWindows"
import { baseApiURL, authorizationToken } from "./constants";

// отображение информации о профиле пользователя в DOM
function renderUserInfo({ name, about, avatar }) {
  const profileImage = document.querySelector('.profile__image')
  profileImage.src = avatar
  profileName.textContent = name
  profileJob.textContent = about
}

// получение информации о пользователе
function getProfileData() {
  fetch(`${baseApiURL}/users/me`, {
    method: 'GET',
    headers: {
      authorization: authorizationToken
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
