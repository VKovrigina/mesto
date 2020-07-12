
export class Card {
  constructor(titleValue, imgValue, {handleCardClick}, cardSelector) {
    this._imgValue = imgValue;
    this._titleValue = titleValue;
    this._handleCardClick = handleCardClick;
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
    this._setEventListeners(cardButtonDelete, cardButtonLike, cardImg);
    return this._element;
  };

  _setEventListeners(buttonDelete, buttonLike, img) {

    buttonLike.addEventListener('click', () => {
      this._toggleLike(buttonLike);
    })

    img.addEventListener('click', () => {
      this._handleCardClick(this._titleValue, this._imgValue);
    })

    buttonDelete.addEventListener('click', () => {
      this._deleteCard();
    })
  };

  _toggleLike(buttonLike) {
    return buttonLike.classList.toggle('cards__button-like_active');
  };

  _deleteCard() {
    this._element.remove();
    this._element = null;
  };
};
