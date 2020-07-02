//спасибо большое код-ревьюеру! Хорошего вам дня :)
import {
  initialCards,
  formProfileElement,
  formPlaceElement,
  popupProfile,
  popupPlace,
  buttonEdit,
  buttonAdd,
  nameInput,
  jobInput,
  titleInput,
  imgInput,
  profileNameInput,
  profileJobInput,
  cardContainer,
  formValidationOptions } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';

// -------------------- Всё, что связано с открытием-закрытием попапов--------------------------

//функция открытия попапов, назначаю тип, так как два попапа сверстаны гридами, другой - флексом
function popupOpen(popup) {
    popup.classList.add('popup_open');
    addListenersPopupClose(popup);
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

//функция добавления в начало контейнера карточки, созданной с помощью класса Card
const addPrependCard = (imgValue, titleValue) => {
  const card = new Card(imgValue, titleValue, popupOpen, '#card-template');
  const cardElement = card.generateCard();
  cardContainer.prepend(cardElement);
};

//вызов функции addPrependCard для появления изночальных карточек из массива
initialCards.forEach((item) => {
  addPrependCard(item.link, item.name);
});

// -------------------- Всё, что связано с формами--------------------------

//функция отправки формы карточек
function formSubmitHandlerPlace(evt, popup) {
  evt.preventDefault();

  addPrependCard(imgInput.value, titleInput.value);
  closePopup(popup);
};

const togglePlace = () => {
    const arrayInput = Array.from(popupPlace.querySelectorAll('.popup__input'));
    arrayInput.forEach(input => {
      placeFormValid.hideInputError(input);
    })
    formPlaceElement.reset();
    placeFormValid.toggleClassButton();
    popupOpen(popupPlace);
};
//formPlaceElement, formValidationOptions.submitButtonSelector, formValidationOptions.inactiveButtonClass

//функция отправки формы профиля
function formSubmitHandlerProfile (evt, popup) {
  evt.preventDefault();
  //значения в тексте profile - из значений поля
  profileNameInput.textContent = nameInput.value;
  profileJobInput.textContent = jobInput.value;

  closePopup(popup);
};

const toggleProfile = () => {
    const arrayInput = Array.from(popupProfile.querySelectorAll('.popup__input'));
    arrayInput.forEach(input => {
      profileFormValid.hideInputError(input);
    })
    addActualMeaningProfileForm();
    profileFormValid.toggleClassButton();
    popupOpen(popupProfile);
};

//функция для появления актуальных значений в попапе профиля
const addActualMeaningProfileForm = () => {
  nameInput.value = profileNameInput.textContent;
  jobInput.value = profileJobInput.textContent;
};

// //вызов функции addPrependCard для появления изночальных карточек из массива
// initialCards.forEach((item) => {
//   addPrependCard(item.link, item.name);
// });

const profileFormValid = new FormValidator(formValidationOptions, formProfileElement);
profileFormValid.enableValidation();

const placeFormValid = new FormValidator(formValidationOptions, formPlaceElement);
placeFormValid.enableValidation();

buttonEdit.addEventListener('click', toggleProfile);
buttonAdd.addEventListener('click', togglePlace);
formProfileElement.addEventListener('submit', (evt) => formSubmitHandlerProfile(evt, popupProfile));
formPlaceElement.addEventListener('submit', (evt) => formSubmitHandlerPlace(evt, popupPlace));
