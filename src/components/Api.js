export default class Api {
  constructor(options) {
    // тело конструктора
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    console.log(this._headers)//TODO:
    this._authorization = this._headers.authorization;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status)
    }
  }

  _handleResponseError(err) {
    console.log(`Ошибка: ${err}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,
    {
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._handleResponse)
    .catch(this._handleResponseError)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._handleResponse)
    .catch(this._handleResponseError)
  }

  editProfile(values) {
    return fetch(`${this._baseUrl}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify(// сюда get values
      values
    )
    })
    .then(this._handleResponse)
    .catch(this._handleResponseError)
  }

  createCard(values) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(// сюда get values
        values
      )
      })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  // другие методы работы с API
}