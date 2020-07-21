import Card from './Card.js';
//без удаления
export default class DefaultCard extends Card {
  constructor(item, {handleCardClick}, cardSelector) {
    super(item, {handleCardClick}, cardSelector)
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImg = this._element.querySelector('.cards__img');
    const cardTitle = this._element.querySelector('.cards__title');
    const cardButtonLike = this._element.querySelector('.cards__button-like');
    const cardLikes = this._element.querySelector('.cards__num-likes');
    cardImg.src = this._imgValue;
    cardImg.alt = this._titleValue;
    cardTitle.textContent = this._titleValue;
    cardLikes.textContent = this._likes;
    super._setEventListeners(cardButtonLike, cardImg);
    return this._element;
  };

}
