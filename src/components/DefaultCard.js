import Card from './Card.js';
//без удаления
export default class DefaultCard extends Card {
  constructor(item, isLiked, {handleCardClick, putLike, deleteLike}, cardSelector) {
    super(item, isLiked, {handleCardClick, putLike, deleteLike}, cardSelector)
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImg = this._element.querySelector('.card__img');
    const cardTitle = this._element.querySelector('.card__title');
    const cardButtonLike = this._element.querySelector('.card__button-like');
    const cardLikes = this._element.querySelector('.card__num-likes');
    if (this._isLiked) {
      cardButtonLike.classList.add('card__button-like_active');
    }
    cardImg.src = this._imgValue;
    cardImg.alt = this._titleValue;
    cardTitle.textContent = this._titleValue;
    cardLikes.textContent = this._likesLength;
    super._setEventListeners(cardButtonLike, cardImg);
    return this._element;
  };

}
