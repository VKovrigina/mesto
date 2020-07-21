
export default class Card {
  constructor(item, {handleCardClick}, cardSelector) {
    this._imgValue = item.link;
    this._titleValue = item.name;
    this._likes = item.likes.length;
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

  _setEventListeners(buttonLike, img) {

    buttonLike.addEventListener('click', () => {
      this._toggleLike(buttonLike);
    })

    img.addEventListener('click', () => {
      this._handleCardClick(this._titleValue, this._imgValue);
    })

  };

  _toggleLike(buttonLike) {
    return buttonLike.classList.toggle('cards__button-like_active');
  };

};
