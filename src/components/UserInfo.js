
export default class UserInfo {
  //нашли элементы по селектору куда должны быть вставлены новые значения
  constructor(nameSelector, jobSelector) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
  }
//функция возвращает объект с данными пользователя. Нужна при открытии
  getUserInfo() {
    this._profileValue = {};
    this._profileValue.name = this._nameSelector.textContent;
    this._profileValue.job = this._jobSelector.textContent;
    return this._profileValue;
  }
//функция принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(values) {
    this._nameSelector.textContent = values.name;
    this._jobSelector.textContent = values.job;
  }
}
