import { profileName, profileJob } from "./modalWindows"
import { baseApiURL, authorizationToken } from "./constants"
import { checkResponse } from "../utils/utils"

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
    .then(checkResponse)
    .then(renderUserInfo)
    .catch(err => console.log(err))
}

export {
  getProfileData
}
