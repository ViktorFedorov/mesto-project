import { profileName, profileJob } from "./modalWindows"

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
  userId
}
