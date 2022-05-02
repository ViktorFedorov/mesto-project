import { checkResponse } from "../utils/utils"

const config = {
  baseApiURL: 'https://mesto.nomoreparties.co/v1/plus-cohort-9',
  headers: {
    authorization: 'cfb5467c-bf03-4f53-98d0-54d36791533e',
    'Content-Type': 'application/json',
  }
}

// получение информации о пользователе
function getProfileData() {
  return fetch(`${config.baseApiURL}/users/me`, {
    headers: config.headers
  })
    .then(checkResponse)
}

// обновление информации о пользователе
function updateProfileData(name, about) {
  return fetch(`${config.baseApiURL}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  })
    .then(checkResponse)
}

// загрузка карточек с сервера
function getCards() {
  return fetch(`${config.baseApiURL}/cards`, {
    headers: config.headers
  })
    .then(checkResponse)
}

// добавление карточки на сервер
function addCard(name, link) {
  return fetch(`${config.baseApiURL}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  })
    .then(checkResponse)
}

// удаление карточки
function deleteCard(id) {
  return fetch(`${config.baseApiURL}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(checkResponse)

}

// добавление лайка
function addLikeToCard(id) {
  return fetch(`${config.baseApiURL}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(checkResponse)
}

// удаление лайка
function removeLikeToCard(id) {
  return fetch(`${config.baseApiURL}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(checkResponse)
}

// редактирование аватара
function updateAvatar(avatar) {
  return fetch(`${config.baseApiURL}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
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
