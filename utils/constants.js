export const initialCards = [
  {
      name: 'Камчатский край',
      link: 'https://images.unsplash.com/photo-1535427284698-c8e68a1eb910?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Москва',
      link: 'https://images.unsplash.com/photo-1567449303183-ae0d6ed1498e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
  },
  {
      name: 'Санкт-Петербург',
      link: 'https://images.unsplash.com/photo-1587507565493-817f6ceb1244?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//формы
export const formProfileElement = document.querySelector('.popup__form_profile');
export const formPlaceElement = document.querySelector('.popup__form_place');
//попапы
export const popupProfile = document.querySelector('.popup_profile');
export const popupPlace = document.querySelector('.popup_place');
//кнопки
export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
//поля форм
export const nameInput = formProfileElement.querySelector('.popup__input_type_name');
export const jobInput = formProfileElement.querySelector('.popup__input_type_job');
export const titleInput = formPlaceElement.querySelector('.popup__input_type_title');
export const imgInput = formPlaceElement.querySelector('.popup__input_type_img');
//элементы, куда должны быть вставлены значения полей
export const profileNameInput = document.querySelector('.profile__name');
export const profileJobInput = document.querySelector('.profile__job');
//контэйнер для карточек
export const cardContainer = document.querySelector('.cards');

export const formValidationOptions = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_inactive',
  inputErrorClass: 'popup__input_type_error'
};
