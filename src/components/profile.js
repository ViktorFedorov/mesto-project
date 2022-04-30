const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__description')

let userId = ''

// сохранение id пользователя в переменную
function setUserId(data) {
  userId = data._id
  return data
}

// отображение информации о профиле пользователя в DOM
function renderUserInfo({ name, about, avatar }) {
  const profileImage = document.querySelector('.profile__image')
  profileImage.src = avatar
  profileName.textContent = name
  profileJob.textContent = about
}

export {
  setUserId,
  renderUserInfo,
  userId,
  profileName,
  profileJob
}
