import { hidePopup, showPopup } from "./modalWindows"
import { addLikeToCard, removeLikeToCard, deleteCard } from "./api"
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

// проверяет есть ли наши лайки на карточке
function checkOwnLikes(likesArray) {
  return likesArray.some(el => el._id === userId)
}

// создание карточки
function createCard(template, card) {
  // клонируем и заполняем элемент карточки
  const cardElem = template.querySelector('.card').cloneNode(true)
  const cardImage = cardElem.querySelector('.card__image')
  const trashIcon = cardElem.querySelector('.card__trash-icon')
  const likeButton = cardElem.querySelector('.card__like-btn')

  // подсвечиваем лайкнутые нами карточки
  if (checkOwnLikes(card.likes)) {
    likeButton.classList.add('card__like-btn_active')
  }

  // скрываем кнопку удаления у чужих карточек
  if (!checkOwner(card.owner._id)) {
    trashIcon.style.display = 'none'
  }

  cardImage.src = card.link
  cardImage.alt = card.name
  cardElem.querySelector('.card__title').textContent = card.name
  cardElem.querySelector('.card__likes-count').textContent = card.likes.length.toString()

  // записываем id каждой карточки в дата-атрибут кнопки 'удалить', для последующей передачи его на сервер для удаления
  trashIcon.setAttribute('data-id', card._id)

  // подвешиваем обработчики событий
  handleClickLike(cardElem.querySelector('.card__like-btn'), card._id)
  handleDeleteCard(trashIcon)
  handleOpenImage(cardImage, card.name)
  return cardElem
}

// рендер карточек пришедших с сервера
function renderCards(data) {
  if (Array.isArray(data)) {
    data.reverse().forEach(card => {
      gallery.prepend(createCard(cardTemplate, card))
    })
  } else {
    gallery.prepend(createCard(cardTemplate, data))
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
    // если карточка лайкнута, удаляем лайк и наоборот
    if (elem.classList.contains('card__like-btn_active')) {
      removeLikeToCard(id)
        .then(data => {
          setLike(elem, data.likes.length)
        })
        .catch(err => console.log(err))
    } else {
      addLikeToCard(id)
        .then(data => {
          setLike(elem, data.likes.length)
        })
        .catch(err => console.log(err))
    }
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
