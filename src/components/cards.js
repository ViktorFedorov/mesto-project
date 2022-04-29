import { showPopup } from "./modalWindows.js"
import { baseApiURL, authorizationToken } from "./constants"
import { checkResponse } from "../utils/utils"

const photoPopup = document.querySelector('.photo-popup')
const photoPopupImage = photoPopup.querySelector('.popup__photo')
const photoPopupLabel = photoPopup.querySelector('.popup__label')
const gallery = document.querySelector('.gallery')
const cardTemplate = document.getElementById('card').content

// создание карточки
function createCard(template, url, title) {
  // клонируем и заполняем элемент карточки
  const card = template.querySelector('.card').cloneNode(true)
  const cardImage = card.querySelector('.card__image')
  cardImage.src = url
  cardImage.alt = title
  card.querySelector('.card__title').textContent = title

  // подвешиваем обработчики событий
  handleClickLike(card.querySelector('.card__like-btn'))
  handleDeleteCard(card.querySelector('.card__trash-icon'))
  handleOpenImage(cardImage, title)
  return card
}

// отрисовка карточек пришедших с сервера
function renderCards(cards) {
  cards.forEach(({ link, name }) => {
    gallery.prepend(createCard(cardTemplate, link, name))
  })
}

// загрузка карточек с сервера
function getCards() {
  fetch(`${baseApiURL}/cards`, {
    method: 'GET',
    headers: { authorization: authorizationToken }
  })
    .then(checkResponse)
    .then(renderCards)
    .catch((err => console.log(err)))
}

// логика работы кнопки "лайк"
function handleClickLike(elem) {
  elem.addEventListener('click', (e) => {
    e.target.classList.toggle('card__like-btn_active')
  })
}

// логика работы кнопки "удалить"
function handleDeleteCard(elem) {
  elem.addEventListener('click', (e) => {
    // добавляем класс анимирующий исчезновение
    e.target.closest('.card').classList.add('smooth-disappearance')

    // после окончания анимации удаляем элемент из DOM
    e.target.addEventListener('transitionend', (e) => {
      e.target.closest('.card').remove()
    })
  })
}

// логика работы открытия модального окна при клике на фото в карточке
function handleOpenImage(elem, alt) {
  elem.addEventListener('click', (e) => {
    photoPopupImage.src = e.target.src
    photoPopupImage.alt = alt
    photoPopupLabel.textContent = alt
    showPopup(photoPopup)
  })
}

export {
  createCard,
  getCards,
  gallery,
  cardTemplate
}
