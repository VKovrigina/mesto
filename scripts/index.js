//спасибо большое код-ревьюеру! Хорошего вам дня :)
import { initialCards } from './array.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
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
//контэйнер для карточек
const cardContainer = document.querySelector('.cards');

const formValidationOptions = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_inactive',
  inputErrorClass: 'popup__input_type_error'
};
// -------------------- Всё, что связано с открытием-закрытием попапов--------------------------

//функция открытия попапов, назначаю тип, так как два попапа сверстаны гридами, другой - флексом
function popupOpen(popup) {
  return function() {
    popup.classList.add('popup_open');
    addListenersPopupClose(popup);
  }
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
  const card = new Card(imgValue, titleValue, popupOpen(popupPhoto), '#card-template');
  const cardElement = card.generateCard();
  cardContainer.prepend(cardElement);
};

// -------------------- Всё, что связано с формами--------------------------

//функция отправки формы карточек
function formSubmitHandlerPlace(evt, popup) {
  evt.preventDefault();

  addPrependCard(imgInput.value, titleInput.value);
  closePopup(popup);
};

const addInitialStatePlace = (popup) => {
  return function() {
    const arrayInput = Array.from(popup.querySelectorAll('.popup__input'));
    arrayInput.forEach(input => {
      placeFormValid.hideInputError(input, formValidationOptions.inputErrorClass);
    })
    formPlaceElement.reset();
    placeFormValid.toggleClassButton(formPlaceElement, formValidationOptions.submitButtonSelector, formValidationOptions.inactiveButtonClass);
  }
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
  return function() {
    const arrayInput = Array.from(popup.querySelectorAll('.popup__input'));
    arrayInput.forEach(input => {
      profileFormValid.hideInputError(input, formValidationOptions.inputErrorClass);
    })
    addActualMeaningProfileForm();
    profileFormValid.toggleClassButton(formProfileElement, formValidationOptions.submitButtonSelector, formValidationOptions.inactiveButtonClass);
  }
};

//функция для появления актуальных значений в попапе профиля
const addActualMeaningProfileForm = () => {
  nameInput.value = profileNameInput.textContent;
  jobInput.value = profileJobInput.textContent;
};

//вызов функции addPrependCard для появления изночальных карточек из массива
initialCards.forEach((item) => {
  addPrependCard(item.link, item.name);
});

const profileFormValid = new FormValidator(formValidationOptions, formProfileElement);
profileFormValid.enableValidation();

const placeFormValid = new FormValidator(formValidationOptions, formPlaceElement);
placeFormValid.enableValidation();

buttonEdit.addEventListener('click', popupOpen(popupProfile));
buttonEdit.addEventListener('click', addInitialStateProfile(popupProfile));
buttonAdd.addEventListener('click', popupOpen(popupPlace));
buttonAdd.addEventListener('click', addInitialStatePlace(popupPlace));
formProfileElement.addEventListener('submit', (evt) => formSubmitHandlerProfile(evt, popupProfile));
formPlaceElement.addEventListener('submit', (evt) => formSubmitHandlerPlace(evt, popupPlace));

