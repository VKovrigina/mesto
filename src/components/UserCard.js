import Card from './Card.js';
// с удалением
export default class UserCard extends Card {
  constructor(item, isLiked, {handleCardClick, deleteCard, putLike, deleteLike}, cardSelector) {
    super(item, isLiked, {handleCardClick, putLike, deleteLike}, cardSelector)
    this._deleteCard = deleteCard;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImg = this._element.querySelector('.card__img');
    const cardTitle = this._element.querySelector('.card__title');
    const cardButtonLike = this._element.querySelector('.card__button-like');
    const cardButtonDelete = this._element.querySelector('.card__button-delete');
    const cardLikes = this._element.querySelector('.card__num-likes');
    if (this._isLiked) {
      cardButtonLike.classList.add('card__button-like_active');
    }
    cardImg.src = this._imgValue;
    cardImg.alt = this._titleValue;
    cardTitle.textContent = this._titleValue;
    cardLikes.textContent = this._likesLength;
    this._setEventListeners(cardButtonDelete, cardButtonLike, cardImg);
    return this._element;
  };

  delete() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners(buttonDelete, buttonLike, img) {
    super._setEventListeners(buttonLike, img);

    buttonDelete.addEventListener('click', () => {
      this._deleteCard(this._id);
    })
  };
}
