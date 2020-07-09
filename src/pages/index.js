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

// -------------------- Всё, что связано с открытием-закрытием попапов--------------------------

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


//функция добавления в начало контейнера карточки, созданной с помощью класса Card
// const addPrependCard = (imgValue, titleValue) => {
//   const card = new Card(imgValue, titleValue, popupOpen, '#card-template');
//   const cardElement = card.generateCard();
//   cardContainer.prepend(cardElement);
// };

// -------------------- Всё, что связано с формами--------------------------

const popupProfile = new PopupWithForm(popupProfileSelector, 
  () => {

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
  } );
popupPlace.setEventListeners();

// //функция отправки формы карточек
// function formSubmitHandlerPlace(evt, popup) {
//   evt.preventDefault();

//   addPrependCard(imgInput.value, titleInput.value);
//   closePopup(popup);
// };

// const togglePlace = () => {
//   formPlaceElement.reset();
//   placeFormValid.resetErrors();
//   popupOpen(popupPlace);
// };

// //функция отправки формы профиля
// function formSubmitHandlerProfile (evt, popup) {
//   evt.preventDefault();
//   //значения в тексте profile - из значений поля
//   profileNameInput.textContent = nameInput.value;
//   profileJobInput.textContent = jobInput.value;

//   closePopup(popup);
// };

// const toggleProfile = () => {
//   addActualMeaningProfileForm();
//   profileFormValid.resetErrors();
//   popupOpen(popupProfile);
// };

// //функция для появления актуальных значений в попапе профиля
// const addActualMeaningProfileForm = () => {
//   nameInput.value = profileNameInput.textContent;
//   jobInput.value = profileJobInput.textContent;
// };

const profileFormValid = new FormValidator(formValidationOptions, formProfileElement);
profileFormValid.enableValidation();

const placeFormValid = new FormValidator(formValidationOptions, formPlaceElement);
placeFormValid.enableValidation();

buttonEdit.addEventListener('click', () => popupProfile.open());
buttonAdd.addEventListener('click', () => popupPlace.open());
