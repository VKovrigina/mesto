
export default class Card {
  constructor(item, isLiked, {handleCardClick, putLike, deleteLike}, cardSelector) {
    this._imgValue = item.link;
    this._titleValue = item.name;
    this._likesLength = item.likes.length;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
    this._id = item._id;
    this._putLike = putLike;
    this._deleteLike = deleteLike;
    this._isLiked = isLiked;
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
      this._toggleLike();
    })

    img.addEventListener('click', () => {
      this._handleCardClick(this._titleValue, this._imgValue);
    })

  };

  removeLike(likesLength) {
    this._element.querySelector('.cards__button-like').classList.toggle('cards__button-like_active');
    this._element.querySelector('.cards__num-likes').textContent = likesLength;
    this._isLiked = !this._isLiked;
  }

  addLike(likesLength) {
    this._element.querySelector('.cards__button-like').classList.toggle('cards__button-like_active');
    this._element.querySelector('.cards__num-likes').textContent = likesLength;
    this._isLiked = !this._isLiked;
  }

  _toggleLike() {
    if (this._isLiked) {
      this._deleteLike(this._id);
    } else {
      this._putLike(this._id);
    }
  };

};
