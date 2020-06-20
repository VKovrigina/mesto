//спасибо большое код-ревьюеру! Хорошего вам дня :)
import { initialCards } from './array.js';
import { Card } from './Card.js';
//формы
const formProfileElement = document.querySelector('.popup__form_profile');
const formPlaceElement = document.querySelector('.popup__form_place');
//попапы
const popupProfile = document.querySelector('.popup_profile');
const popupPhoto = document.querySelector('.popup_photo');
const popupPlace = document.querySelector('.popup_place');
//кнопки
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
//поля форм
const nameInput = formProfileElement.querySelector('.popup__input_type_name');
const jobInput = formProfileElement.querySelector('.popup__input_type_job');
const titleInput = formPlaceElement.querySelector('.popup__input_type_title');
const imgInput = formPlaceElement.querySelector('.popup__input_type_img');
//элементы, куда должны быть вставлены значения полей
const profileNameInput = document.querySelector('.profile__name');
const profileJobInput = document.querySelector('.profile__job');
const popupPhotoImg = document.querySelector('.popup__img');
const popupPhotoTitle = document.querySelector('.popup__photo-title');
//контэйнер для карточек
const cardContainer = document.querySelector('.cards');

const formValidationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
// -------------------- Всё, что связано с открытием-закрытием попапов--------------------------

//функция открытия попапов, назначаю тип, так как два попапа сверстаны гридами, другой - флексом
function popupOpen(popup) {
  return function() {
    popup.classList.add('popup_open');
    addListenersPopupClose(popup);
    if (document.querySelector('.popup_profile.popup_open')) {
      addInitialStateProfile(popupProfile);
    }
    if (document.querySelector('.popup_place.popup_open')) {
      addInitialStatePlace(popupPlace);
    }
  };
};

const closePopup = (popup) => {
  popup.classList.remove('popup_open');

  removeListenersPopupClose(popup);
};

const closePopupClick = (evt) => {
  if(evt.target.classList.contains('popup_open') || evt.target.classList.contains('popup__close-button')) {
    closePopup(document.querySelector('.popup_open'));
  }
};

const closePopupEsc = (evt) => {
  if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_open'));
  }
};

//добавление слушателей закрытия попапа
const addListenersPopupClose = (popup) => {
  popup.addEventListener('click', closePopupClick);
  document.addEventListener('keydown', closePopupEsc);
};
//удаление слушателей
const removeListenersPopupClose = (popup) => {
  document.removeEventListener('keydown', closePopupEsc);
  popup.removeEventListener('click', closePopupClick);
};

// -------------------- Всё, что связано с карточками--------------------------
//функция создания карточек
// function createCard(imgValue, titleValue) {
//   const cardTemplatePlace = document.querySelector('#card-template').content;
//   const cardElement = cardTemplatePlace.cloneNode(true);
//   const cardImg = cardElement.querySelector('.cards__img');
//   const cardTitle = cardElement.querySelector('.cards__title');
//   const cardButtonLike = cardElement.querySelector('.cards__button-like');
//   const cardButtonDelete = cardElement.querySelector('.cards__button-delete');
//   cardImg.src = imgValue;
//   cardImg.alt = titleValue;
//   cardTitle.textContent = titleValue;
//   addCardListeners(cardButtonDelete, cardButtonLike, cardImg, imgValue, titleValue);
//   return cardElement;
// };

// const addCardListeners = (buttonDelete, buttonLike, img, imgValue, titleValue) => {
//   buttonDelete.addEventListener('click', deleteCard);
//   buttonLike.addEventListener('click', toggleLike);
//   img.addEventListener('click', addPreviewValue(imgValue, titleValue));
//   img.addEventListener('click', popupOpen(popupPhoto));
// };

// const deleteCard = (evt) => {
//   evt.target.closest('.cards__item').remove();
// };

// const toggleLike = (evt) => {
//   evt.target.classList.toggle('cards__button-like_active');
// };

// const addPreviewValue = (imgValue, titleValue) => {
//   return function() {
//   popupPhotoImg.src = imgValue;
//   popupPhotoImg.alt = titleValue;
//   popupPhotoTitle.textContent = titleValue;
//   };
// };

// const prependCard = (imgValue, titleValue) => {
//   cardContainer.prepend(createCard(imgValue, titleValue));
// };

//функция добавления карточки в начало контейнера
// const prependCard = (element) => {
//   cardContainer.prepend(element);
// };

// -------------------- Всё, что связано с формами--------------------------

//функция отправки формы карточек
function formSubmitHandlerPlace(evt, popup) {
  evt.preventDefault();

  prependCard(imgInput.value, titleInput.value);
  closePopup(popup);
};

const addInitialStatePlace = (popup) => {
  const arrayInput = Array.from(popup.querySelectorAll('.popup__input'));
  arrayInput.forEach(input => {
    hideInputError(input, formValidationOptions.inputErrorClass);
  })
  formPlaceElement.reset();
  toggleClassButton(formPlaceElement, formValidationOptions.submitButtonSelector, formValidationOptions.inactiveButtonClass);
};

//функция отправки формы профиля
function formSubmitHandlerProfile (evt, popup) {
  evt.preventDefault();
  //значения в тексте profile - из значений поля
  profileNameInput.textContent = nameInput.value;
  profileJobInput.textContent = jobInput.value;

  closePopup(popup);
};

const addInitialStateProfile = (popup) => {
  const arrayInput = Array.from(popup.querySelectorAll('.popup__input'));
  arrayInput.forEach(input => {
    hideInputError(input, formValidationOptions.inputErrorClass);
  })
  handleProfileFormSubmit();
  toggleClassButton(formProfileElement, formValidationOptions.submitButtonSelector, formValidationOptions.inactiveButtonClass);
};

//функция для появления актуальных значений в попапе профиля
const handleProfileFormSubmit = () => {
  nameInput.value = profileNameInput.textContent;
  jobInput.value = profileJobInput.textContent;
};

//вызов функции addCard для появления изночальных карточек из массива
// initialCards.forEach(function (item) {
//   prependCard(item.link, item.name);
// });

// const prependCard = (imgValue, titleValue) => {
//   cardContainer.prepend(createCard(imgValue, titleValue));
// };

initialCards.forEach((item) => {
  const card = new Card(item.link, item.name, popupOpen, '#card-template');
  const cardElement = card.generateCard();
  cardContainer.prepend(cardElement);
})


buttonEdit.addEventListener('click', popupOpen(popupProfile));
buttonAdd.addEventListener('click', popupOpen(popupPlace));
formProfileElement.addEventListener('submit', (evt) => formSubmitHandlerProfile(evt, popupProfile));
formPlaceElement.addEventListener('submit', (evt) => formSubmitHandlerPlace(evt, popupPlace));

enableValidation(formValidationOptions);
