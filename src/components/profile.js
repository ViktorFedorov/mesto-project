import { profileName, profileJob } from "./modalWindows"
import { baseApiURL, authorizationToken } from "./constants"
import { checkResponse } from "../utils/utils"

let userId = ''

// отображение информации о профиле пользователя в DOM
function renderUserInfo({ name, about, avatar }) {
  const profileImage = document.querySelector('.profile__image')
  profileImage.src = avatar
  profileName.textContent = name
  profileJob.textContent = about
}

// сохранение id пользователя в переменную
function setUserId(data) {
  userId = data._id
  return data
}

// получение информации о пользователе
function getProfileData() {
  fetch(`${baseApiURL}/users/me`, {
    headers: { authorization: authorizationToken }
  })
    .then(checkResponse)
    .then(setUserId)
    .then(renderUserInfo)
    .catch(err => console.log(err))
}

// обновление информации о пользователе
function updateProfileData(name, about) {
  fetch(`${baseApiURL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: authorizationToken
    },
    body: JSON.stringify({
      name,
      about
    })
  })
    .then(checkResponse)
    .then(renderUserInfo)
    .catch(err => console.log(err))
}

export {
  getProfileData,
  updateProfileData,
  userId
}
