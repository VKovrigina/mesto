export const initialCards = [
  {
      name: 'Чехия',
      link: 'https://images.unsplash.com/photo-1592838464221-a7268248a9ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80'
  },
  {
      name: 'Китай',
      link: 'https://images.unsplash.com/photo-1567266565446-d9c40ccf59a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  },
  {
      name: 'Чили',
      link: 'https://images.unsplash.com/photo-1593053272490-e0ed6d6a42c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
  },
  {
      name: 'Норвегия',
      link: 'https://images.unsplash.com/photo-1588263271366-8232e713ff00?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'
  },
  {
      name: 'Англия',
      link: 'https://images.unsplash.com/photo-1469047616593-20bed1f1217a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDAxNX0&auto=format&fit=crop&w=333&q=80'
  },
  {
      name: 'Бельгия',
      link: 'https://images.unsplash.com/photo-1572895854902-117546c75fb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80'
  }
];

//формы
export const formProfileElement = document.querySelector('.popup__form_profile');
export const formPlaceElement = document.querySelector('.popup__form_place');
//попапы
export const popupProfileSelector = document.querySelector('.popup_profile');
export const popupPlaceSelector = document.querySelector('.popup_place');
export const popupPhotoSelector = document.querySelector('.popup_photo');
//кнопки
export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
//поля форм
export const nameInput = formProfileElement.querySelector('.popup__input_type_name');
export const jobInput = formProfileElement.querySelector('.popup__input_type_job');
//контэйнер для карточек
export const cardContainer = '.cards';

export const popupPhotoImg = document.querySelector('.popup__img');
export const popupPhotoTitle = document.querySelector('.popup__photo-title');

export const formValidationOptions = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_inactive',
  inputErrorClass: 'popup__input_type_error'
};
