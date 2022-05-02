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

// удаление карточки
function deleteCard(id) {
  fetch(`${baseApiURL}/cards/${id}`, {
    method: 'DELETE',
    headers: { authorization: authorizationToken }
  })
    .catch(console.log)
}

// добавление лайка
function addLikeToCard(id) {
  return fetch(`${baseApiURL}/cards/likes/${id}`, {
    method: 'PUT',
    headers: { authorization: authorizationToken }
  })
    .then(checkResponse)
}

// удаление лайка
function removeLikeToCard(id) {
  return fetch(`${baseApiURL}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: { authorization: authorizationToken }
  })
    .then(checkResponse)
}

// редактирование аватара
function updateAvatar(avatar) {
  return fetch(`${baseApiURL}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: authorizationToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ avatar })
  })
    .then(checkResponse)
}

export {
  getProfileData,
  updateProfileData,
  getCards,
  addCard,
  deleteCard,
  addLikeToCard,
  removeLikeToCard,
  updateAvatar
}
