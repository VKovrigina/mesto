// Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
// принимает в конструктор её данные и селектор её template-элемента;
// содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
// содержит приватные методы для каждого обработчика;
// содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
// Для каждой карточки создайте экземпляр класса Card.
const cardImg = document.querySelector('.cards__img');
const cardTitle = document.querySelector('.cards__title');
const cardButtonLike = document.querySelector('.cards__button-like');
const cardButtonDelete = document.querySelector('.cards__button-delete');

export class Card {
  constructor(imgValue, titleValue, popupOpen, cardSelector) {//принимает linkImg Title и селектор её template-элемента '#card-template' + функцию открытия
    this._imgValue = imgValue;
    this._titleValue = titleValue;
    this._popupOpen = popupOpen;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    //возвратить шаблон карточки
    //возможно, стоит убрать .querySelector('.cards__item')
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    //возвратить полностью работоспособный и
    //наполненный данными элемент карточки
    this._element = this._getTemplate(); //добавить шаблон
    this._element.querySelector('.cards__img').src = this._imgValue;
    this._element.querySelector('.cards__img').alt = this._titleValue;
    this._element.querySelector('.cards__title').textContent = this._titleValue;
    return this._element;
  }

  _setEventListeners() {
    //повесить слушатели
  }

  //метод _toggleLike
  //метод _addPreviewValue
  //метод _deleteCard

}
