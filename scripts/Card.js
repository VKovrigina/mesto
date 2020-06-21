// Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
// принимает в конструктор её данные и селектор её template-элемента;
// содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
// содержит приватные методы для каждого обработчика;
// содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
// Для каждой карточки создайте экземпляр класса Card.
const popupPhotoImg = document.querySelector('.popup__img');
const  popupPhotoTitle = document.querySelector('.popup__photo-title');
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
    this._element = this._getTemplate();//добавить шаблон
    const cardImg = this._element.querySelector('.cards__img');
    const cardTitle = this._element.querySelector('.cards__title');
    const cardButtonLike = this._element.querySelector('.cards__button-like');
    const cardButtonDelete = this._element.querySelector('.cards__button-delete');
    cardImg.src = this._imgValue;
    cardImg.alt = this._titleValue;
    cardTitle.textContent = this._titleValue;
    this._setEventListeners(cardButtonDelete, cardButtonLike, cardImg, this._imgValue, this._titleValue);
    return this._element;
  }

  _setEventListeners(buttonDelete, buttonLike, img, imgValue, titleValue) {
    //повесить слушатели
    //слушатель на кнопку лайка
    buttonLike.addEventListener('click', () => {
      this._toggleLike(buttonLike);
    })

    img.addEventListener('click', () => {
      this._addPreviewValue(imgValue, titleValue);
    })

    img.addEventListener('click', () => {
      this._popupOpen();
    })

    buttonDelete.addEventListener('click', () => {
      this._deleteCard();
    })
  }

  _toggleLike(buttonLike) {
    return buttonLike.classList.toggle('cards__button-like_active');
  }

  _addPreviewValue(imgValue, titleValue) {
      popupPhotoImg.src = imgValue;
      popupPhotoImg.alt = titleValue;
      popupPhotoTitle.textContent = titleValue;
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}
