//спасибо большое код-ревьюеру! Хорошего вам дня :)
//изменила на селектор попапы
import {
  initialCards,
  formProfileElement,
  formPlaceElement,
  popupProfileSelector,
  popupPlaceSelector,
  buttonEdit,
  buttonAdd,
  nameInput,
  jobInput,
  titleInput,
  imgInput,
  profileNameInput,
  profileJobInput,
  cardContainer,
  formValidationOptions,
  popupPhotoSelector } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// -------------------- Всё, что связано с карточками--------------------------
const popupPhoto = new PopupWithImage(popupPhotoSelector);
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

const popupProfile = new PopupWithForm(popupProfileSelector, 
  (values) => {
    userInfo.setUserInfo(values);
  },
 () => {
  profileFormValid.resetErrors();
});
popupProfile.setEventListeners();

const popupPlace = new PopupWithForm(popupPlaceSelector,
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
  popupProfile.open();
  addActualMeaningProfileForm();
});
buttonAdd.addEventListener('click', () => popupPlace.open());
