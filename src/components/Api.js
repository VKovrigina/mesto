export default class Api {
  constructor(options) {
    // тело конструктора
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authorization = this._headers.authorization;
  }

  getInitialCards() {
    // ...
  }

  getUserInfo(renderer) {
    fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status)
      }})
    .then((res) => {
      console.log(res);
      renderer(res);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
  }

  // другие методы работы с API
}
