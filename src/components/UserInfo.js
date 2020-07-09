// Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
// Принимает в конструктор объект с селекторами двух элементов:
//элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
//Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя
//и добавляет их на страницу.

export default class UserInfo {
  //нашли элементы по селектору куда должны быть вставлены новые значения
  constructor(nameSelector, jobSelector) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
  }
//который возвращает объект с данными пользователя.при открытии.
  getUserInfo() {
    this._profileValue = {};
    this._profileValue.name = this._nameSelector.textContent;
    this._profileValue.job = this._jobSelector.textContent;
    return this._profileValue;
  }
//который принимает новые данные пользователя
//и добавляет их на страницу.
  setUserInfo(values) {
    this._nameSelector.textContent = values.name;
    this._jobSelector.textContent = values.job;
  }
}
