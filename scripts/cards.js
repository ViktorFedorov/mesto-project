const addCardForm = document.querySelector('.add-card-form')

const inpPlaceName = document.querySelector('.profile-edit-form__input_place_name')
const inpPlaceUrl = document.querySelector('.profile-edit-form__input_place_url')

const gallery = document.querySelector('.gallery')
const likeBtns = document.querySelectorAll('.card__like-btn')
const cardTemplate = document.getElementById('card').content

/*
* подвешивает слушатель события клика на кнопке лайк - вынесено в отдельную функцию, чтобы
* использовать и с динамической и со статической разметкой, в перспективе, когда карточки
* будут динаически подгружаться - можно удалить*
* */
function handleClickLike(elem) {
  elem.addEventListener('click', (event) => {
    event.target.classList.toggle('card__like-btn_active')
  })
}

function addCard(template, url, title) {
  // клонируем и заполняем элемент карточки
  const card = template.querySelector('.card').cloneNode(true)
  card.querySelector('.card__image').src = url
  card.querySelector('.card__title').textContent = title

  // подвешиваем событие по клику
  handleClickLike(card.querySelector('.card__like-btn'))
  return card
}

addCardForm.addEventListener('submit', (e) => {
  e.preventDefault()
  gallery.insertAdjacentElement('afterbegin', addCard(cardTemplate, inpPlaceUrl.value, inpPlaceName.value))

  inpPlaceName.value = ''
  inpPlaceUrl.value = ''

  hidePopup()
})

// вешаем слушатель события на статическую разметку
for (const likeBtn of likeBtns) {
  handleClickLike(likeBtn)
}
