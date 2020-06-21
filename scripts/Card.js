const popupPhotoImg = document.querySelector('.popup__img');
const  popupPhotoTitle = document.querySelector('.popup__photo-title');
export class Card {
  constructor(imgValue, titleValue, popupOpen, cardSelector) {
    this._imgValue = imgValue;
    this._titleValue = titleValue;
    this._popupOpen = popupOpen;
    this._cardSelector = cardSelector;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);
    return cardElement;
  };

  generateCard() {
    this._element = this._getTemplate();
    const cardImg = this._element.querySelector('.cards__img');
    const cardTitle = this._element.querySelector('.cards__title');
    const cardButtonLike = this._element.querySelector('.cards__button-like');
    const cardButtonDelete = this._element.querySelector('.cards__button-delete');
    cardImg.src = this._imgValue;
    cardImg.alt = this._titleValue;
    cardTitle.textContent = this._titleValue;
    this._setEventListeners(cardButtonDelete, cardButtonLike, cardImg, this._imgValue, this._titleValue);
    return this._element;
  };

  _setEventListeners(buttonDelete, buttonLike, img, imgValue, titleValue) {

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
  };

  _toggleLike(buttonLike) {
    return buttonLike.classList.toggle('cards__button-like_active');
  };

  _addPreviewValue(imgValue, titleValue) {
      popupPhotoImg.src = imgValue;
      popupPhotoImg.alt = titleValue;
      popupPhotoTitle.textContent = titleValue;
  };

  _deleteCard() {
    this._element.remove();
    this._element = null;
  };
};
