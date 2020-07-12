//спасибо большое код-ревьюеру! Хорошего вам дня :)
import {
  initialCards,
  formProfileSelector,
  formPlaceSelector,
  popupProfileSelector,
  popupPlaceSelector,
  buttonEditSelector,
  buttonAddSelector,
  nameInputSelector,
  jobInputSelector,
  cardContainer,
  formValidationOptions,
  popupPhotoSelector,
  popupPhotoImgSelector,
  popupPhotoTitleSelector} from '../utils/constants.js';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

//формы
const formProfileElement = document.querySelector(formProfileSelector);
const formPlaceElement = document.querySelector(formPlaceSelector);
//попапы
const popupProfileElement = document.querySelector(popupProfileSelector);
const popupPlaceElement = document.querySelector(popupPlaceSelector);
const popupPhotoElement = document.querySelector(popupPhotoSelector);
//кнопки
const buttonEdit = document.querySelector(buttonEditSelector);
const buttonAdd = document.querySelector(buttonAddSelector);
//поля форм
const nameInput = formProfileElement.querySelector(nameInputSelector);
const jobInput = formProfileElement.querySelector(jobInputSelector);

const popupPhotoImg = document.querySelector(popupPhotoImgSelector);
const popupPhotoTitle = document.querySelector(popupPhotoTitleSelector);


// -------------------- Всё, что связано с карточками--------------------------
const popupPhoto = new PopupWithImage(popupPhotoElement, popupPhotoImg, popupPhotoTitle);
popupPhoto.setEventListeners();

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(
      item.name, item.link,
      { handleCardClick: () => {
        popupPhoto.open(item.name, item.link);
      } },
      '#card-template');
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  },
},
cardContainer
);
//отрисовка первоначальных карточек
cardsList.renderItems();

// ---------------------------Валидация----------------------------------------

const profileFormValid = new FormValidator(formValidationOptions, formProfileElement);
profileFormValid.enableValidation();

const placeFormValid = new FormValidator(formValidationOptions, formPlaceElement);
placeFormValid.enableValidation();


// -------------------- Всё, что связано с формами--------------------------
const userInfo = new UserInfo('.profile__name', '.profile__job');

const popupProfile = new PopupWithForm(popupProfileElement,
  (values) => {
    userInfo.setUserInfo(values);
  },
 () => {
  profileFormValid.resetErrors();
});
popupProfile.setEventListeners();

const popupPlace = new PopupWithForm(popupPlaceElement,
  //функция при сабмите
  ({title, img}) => {
    const newCard = new Card (title, img,
    { handleCardClick: (titleValue, imgValue) => {
        popupPhoto.open(titleValue, imgValue);
      }
    }, '#card-template');
    const newCardElement = newCard.generateCard();
    cardsList.addItem(newCardElement);
  },
  //функция сброса ошибок
  () => {
    placeFormValid.resetErrors();
  });
popupPlace.setEventListeners();

const addActualMeaningProfileForm = () => {
  const {name, job} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
}


buttonEdit.addEventListener('click', () => {
  addActualMeaningProfileForm();
  popupProfile.open();
});
buttonAdd.addEventListener('click', () => popupPlace.open());
