// проверка ответа сервера
function checkResponse(response) {
  if (!response.ok) {
    return Promise.reject(`Ошибка: ${response.status}`)
  }
  return response.json()
}

// индикатор загрузки
function isLoading(elem, bool) {
  const button = elem.querySelector('.profile-edit-form__save-btn')

  if (bool) {
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = 'Сохранить'
  }
}

export {
  checkResponse,
  isLoading
}
