// Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
// Принимает в конструктор объект с селекторами двух элементов:
//элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
//Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя
//и добавляет их на страницу.

export default class UserInfo {
  //нашли элементы по селектору
  constructor(nameSelector, jobSelector) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
  }
//который возвращает объект с данными пользователя.при открытии.
  getUserInfo() {
    nameInput.value = profileNameInput.textContent;
    jobInput.value = profileJobInput.textContent;
  }
//который принимает новые данные пользователя
//и добавляет их на страницу.
  setUserInfo() {
    profileNameInput.textContent = nameInput.value;
    profileJobInput.textContent = jobInput.value;
  }
}
