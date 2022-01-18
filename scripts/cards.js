const addCardForm = document.querySelector('.add-card-form')

const inpPlaceName = document.querySelector('.profile-edit-form__input_place_name')
const inpPlaceUrl = document.querySelector('.profile-edit-form__input_place_url')

const gallery = document.querySelector('.gallery')

const cardTemplate = document.getElementById('card').content

function addCard(template, url, title) {
  const card = template.querySelector('.card').cloneNode(true)
  card.querySelector('.card__image').src = url
  card.querySelector('.card__title').textContent = title
  return card
}

addCardForm.addEventListener('submit', (e) => {
  e.preventDefault()
  gallery.insertAdjacentElement('afterbegin', addCard(cardTemplate, inpPlaceUrl.value, inpPlaceName.value))
  hidePopup()
})
