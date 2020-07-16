export default class Api {
  constructor(options) {
    // тело конструктора
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    console.log(this._headers)//TODO:
    this._authorization = this._headers.authorization;
  }

  getInitialCards(renderer) {
    fetch(`${this._baseUrl}/cards`, {
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
      console.log(res);//TODO:
      renderer(res);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
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
      console.log(res);//TODO:
      renderer(res);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
  }

  editProfile(renderer) {
    fetch(`${this._baseUrl}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: 'Marie Skłodowska Curie',
      about: 'Physicist and Chemist'
    })
    })
  }

  // другие методы работы с API
}
