import Card from './Card.js';
// с удалением
export default class UserCard extends Card {
  constructor(item, {handleCardClick, deleteCard}, cardSelector) {
    super(item, {handleCardClick}, cardSelector)
    this._deleteCard = deleteCard;
    this._id = item._id;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImg = this._element.querySelector('.cards__img');
    const cardTitle = this._element.querySelector('.cards__title');
    const cardButtonLike = this._element.querySelector('.cards__button-like');
    const cardButtonDelete = this._element.querySelector('.cards__button-delete');
    const cardLikes = this._element.querySelector('.cards__num-likes');
    cardImg.src = this._imgValue;
    cardImg.alt = this._titleValue;
    cardTitle.textContent = this._titleValue;
    cardLikes.textContent = this._likes;
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
