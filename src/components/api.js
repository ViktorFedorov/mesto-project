import { setUserId, renderUserInfo } from "./profile"
import { renderCards } from "./cards"
import { authorizationToken, baseApiURL } from "./constants"
import { checkResponse } from "../utils/utils"

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

// загрузка карточек с сервера
function getCards() {
  fetch(`${baseApiURL}/cards`, {
    headers: { authorization: authorizationToken }
  })
    .then(checkResponse)
    .then(data => {
      console.log(data)
      return data
    })
    .then(renderCards)
    .catch((err => console.log(err)))
}

// добавление карточки на сервер
function addCard(name, link) {
  fetch(`${baseApiURL}/cards`, {
    method: 'POST',
    headers: {
      authorization: authorizationToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      link
    })
  })
    .then(checkResponse)
    .then(renderCards)
    .catch((err => console.log(err)))
}

export {
  getProfileData,
  updateProfileData,
  getCards,
  addCard
}
