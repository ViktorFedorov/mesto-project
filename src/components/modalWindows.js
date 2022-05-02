// закрытие модальных окон клавишей Esc
function handleEscape(e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    hidePopup(openedPopup)
  }
}

//закрытие модальных окон кликом на оверлэй
function handleMousedown(e) {
  if (e.target.classList.contains('popup')) {
    hidePopup(e.target)
  }
}

function showPopup(popup) {
  popup.classList.add('popup_opened')
  document.body.addEventListener('keydown', handleEscape)
  document.body.addEventListener('mousedown', handleMousedown)
}

function hidePopup(popup) {
  popup.classList.remove('popup_opened')

  // удаляем слушатели после закрытия
  document.body.removeEventListener('keydown', handleEscape)
  document.body.removeEventListener('mousedown', handleMousedown)
}

export {
  showPopup,
  hidePopup
}
