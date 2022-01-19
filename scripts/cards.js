const gallery = document.querySelector('.gallery')
const addCardForm = document.querySelector('.add-card-form')

const inpPlaceName = document.querySelector('.profile-edit-form__input_place_name')
const inpPlaceUrl = document.querySelector('.profile-edit-form__input_place_url')

const likeBtns = document.querySelectorAll('.card__like-btn')
const deleteCardBtns = document.querySelectorAll('.card__trash-icon')

const cardTemplate = document.getElementById('card').content

/*
* подвешивает слушатель события клика на кнопке лайк - вынесено в отдельную функцию, чтобы
* использовать и с динамической и со статической разметкой, в перспективе, когда карточки
* будут динаически подгружаться - можно удалить
* */
function handleClickLike(elem) {
  elem.addEventListener('click', (e) => {
    e.target.classList.toggle('card__like-btn_active')
  })
}

function handleDeleteCard(elem) {
  elem.addEventListener('click', (e) => {
    e.target.parentElement.remove()
  })
}

function addCard(template, url, title) {
  // клонируем и заполняем элемент карточки
  const card = template.querySelector('.card').cloneNode(true)
  card.querySelector('.card__image').src = url
  card.querySelector('.card__title').textContent = title

  // подвешиваем события по клику
  handleClickLike(card.querySelector('.card__like-btn'))
  handleDeleteCard(card.querySelector('.card__trash-icon'))
  return card
}

addCardForm.addEventListener('submit', (e) => {
  e.preventDefault()
  gallery.insertAdjacentElement('afterbegin', addCard(cardTemplate, inpPlaceUrl.value, inpPlaceName.value))

  inpPlaceName.value = ''
  inpPlaceUrl.value = ''

  hidePopup()
})

// вешаем слушатели события на статическую разметку
for (const likeBtn of likeBtns) {
  handleClickLike(likeBtn)
}

for (const deleteBtn of deleteCardBtns) {
  handleDeleteCard(deleteBtn)
}

