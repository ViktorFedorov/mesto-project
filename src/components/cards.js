import { hidePopup, showPopup } from "./modalWindows"
import { addLikeToCard, deleteCard } from "./api"
import { userId } from "./profile"

const photoPopup = document.querySelector('.photo-popup')
const confirmDeletePopup = document.querySelector('.confirm-delete-popup')
const photoPopupImage = photoPopup.querySelector('.popup__photo')
const photoPopupLabel = photoPopup.querySelector('.popup__label')
const gallery = document.querySelector('.gallery')
const cardTemplate = document.getElementById('card').content

// проверяет является ли пользователь владельцем карточки
function checkOwner(ownerId) {
  return userId === ownerId
}

// создание карточки
function createCard(template, url, title, ownerId, cardId, likesCount = 0) {
  // клонируем и заполняем элемент карточки
  const card = template.querySelector('.card').cloneNode(true)
  const cardImage = card.querySelector('.card__image')
  const trashIcon = card.querySelector('.card__trash-icon')

  // скрываем кнопку удаления у чужих карточек
  if (!checkOwner(ownerId)) {
    trashIcon.style.display = 'none'
  }

  cardImage.src = url
  cardImage.alt = title
  card.querySelector('.card__title').textContent = title
  card.querySelector('.card__likes-count').textContent = likesCount.toString()

  // записываем id каждой карточки в дата-атрибут кнопки 'удалить', для последующей передачи его на сервер для удаления
  trashIcon.setAttribute('data-id', cardId)

  // подвешиваем обработчики событий
  handleClickLike(card.querySelector('.card__like-btn'), cardId)
  handleDeleteCard(trashIcon)
  handleOpenImage(cardImage, title)
  return card
}

// отрисовка карточек пришедших с сервера
function renderCards(data) {
  if (Array.isArray(data)) {
    data.reverse().forEach((card) => {
      gallery.prepend(createCard(cardTemplate, card.link, card.name, card.owner._id, card._id, card.likes.length))
    })
  } else {
    gallery.prepend(createCard(cardTemplate, data.link, data.name, data.owner._id, data._id))
  }
}

// рендер обновленного количества лайков
function setLike(elem, likesCount) {
  const likes = elem.nextElementSibling
  likes.textContent = likesCount
}

// логика работы кнопки "лайк"
function handleClickLike(elem, id) {
  elem.addEventListener('click', (e) => {
    addLikeToCard(id)
      .then(data => {
        setLike(elem, data.likes.length)
      })
      .catch(err => console.log(err))

    e.target.classList.toggle('card__like-btn_active')
  })
}

// подтверждение удаления карточки
function confirmDelete(elem) {
  showPopup(confirmDeletePopup)

  confirmDeletePopup.addEventListener('submit', (e) => {
    e.preventDefault()
    deleteCard(elem.getAttribute('data-id'))
    elem.closest('.card').remove()
    hidePopup(confirmDeletePopup)
  })
}

// логика работы кнопки "удалить" - открывает модальное окно для подтверждения
function handleDeleteCard(elem) {
  elem.addEventListener('click', (e) => {
    confirmDelete(e.target)
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
  renderCards,
  gallery,
  cardTemplate
}
