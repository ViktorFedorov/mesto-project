import { checkResponse } from "../utils/utils"

const baseApiURL = 'https://mesto.nomoreparties.co/v1/plus-cohort-9'
const authorizationToken = 'cfb5467c-bf03-4f53-98d0-54d36791533e'

// получение информации о пользователе
function getProfileData() {
  return fetch(`${baseApiURL}/users/me`, {
    headers: { authorization: authorizationToken }
  })
    .then(checkResponse)
}

// обновление информации о пользователе
function updateProfileData(name, about) {
  return fetch(`${baseApiURL}/users/me`, {
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
}

// загрузка карточек с сервера
function getCards() {
  return fetch(`${baseApiURL}/cards`, {
    headers: { authorization: authorizationToken }
  })
    .then(checkResponse)
}

// добавление карточки на сервер
function addCard(name, link) {
  return fetch(`${baseApiURL}/cards`, {
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
}

export {
  getProfileData,
  updateProfileData,
  getCards,
  addCard
}
