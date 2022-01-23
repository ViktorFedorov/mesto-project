const gallery = document.querySelector('.gallery')
const addCardForm = document.querySelector('.add-card-form')

const inpPlaceName = document.querySelector('.profile-edit-form__input_place_name')
const inpPlaceUrl = document.querySelector('.profile-edit-form__input_place_url')

const cardTemplate = document.getElementById('card').content

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
    e.target.parentElement.classList.add('smooth-disappearance')

    // после окончания анимации удаляем элемент из DOM
    e.target.addEventListener('transitionend', (e) => {
      e.target.parentElement.remove()
    })
  })
}

// логика работы открытия модального окна при клике на фото в карточке
function handleOpenImage(elem) {
  elem.addEventListener('click', (e) => {
    photoPopup.querySelector('.popup__photo').src = e.target.src
    showPopup(photoPopup)
  })
}

function createCard(template, url, title) {
  // клонируем и заполняем элемент карточки
  const card = template.querySelector('.card').cloneNode(true)
  card.querySelector('.card__image').src = url
  card.querySelector('.card__title').textContent = title

  // подвешиваем обработчики событий
  handleClickLike(card.querySelector('.card__like-btn'))
  handleDeleteCard(card.querySelector('.card__trash-icon'))
  handleOpenImage(card.querySelector('.card__image'))
  return card
}

// добавление карточки
addCardForm.addEventListener('submit', (e) => {
  e.preventDefault()
  gallery.insertAdjacentElement('afterbegin', createCard(cardTemplate, inpPlaceUrl.value, inpPlaceName.value))

  inpPlaceName.value = ''
  inpPlaceUrl.value = ''

  hidePopup(addCardPopup)
})

// отрисовывем карточки из массива
initialCards.forEach((card) => {
  gallery.insertAdjacentElement('afterbegin', createCard(cardTemplate, card.link, card.name))
})
