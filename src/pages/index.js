//спасибо большое код-ревьюеру! Хорошего вам дня :)
import {
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
  popupDeleteCardSelector,
  popupPhotoImgSelector,
  popupPhotoTitleSelector} from '../utils/constants.js';

import Card from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import UserCard from '../components/UserCard.js';
import DefaultCard from '../components/DefaultCard.js';
import './index.css';

//формы
const formProfileElement = document.querySelector(formProfileSelector);
const formPlaceElement = document.querySelector(formPlaceSelector);
//попапы
const popupProfileElement = document.querySelector(popupProfileSelector);
const popupPlaceElement = document.querySelector(popupPlaceSelector);
const popupPhotoElement = document.querySelector(popupPhotoSelector);
const popupDeleteCardElement = document.querySelector(popupDeleteCardSelector);
//кнопки
const buttonEdit = document.querySelector(buttonEditSelector);
const buttonAdd = document.querySelector(buttonAddSelector);
//поля форм
const nameInput = formProfileElement.querySelector(nameInputSelector);
const jobInput = formProfileElement.querySelector(jobInputSelector);

const popupPhotoImg = document.querySelector(popupPhotoImgSelector);
const popupPhotoTitle = document.querySelector(popupPhotoTitleSelector);

/** API */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '64f8b885-2658-44d6-bc45-dfe390bdb5b7',
    'Content-Type': 'application/json'
  }
});

const cardsList = new Section({
  renderer: (item) => {
    console.log(item)//TODO:
        const card = new Card(
          item,
          { handleCardClick: () => {
            popupPhoto.open(item.name, item.link);
          }},
          '#card-template');
          const cardElement = card.generateCard();
          cardsList.addItem(cardElement);
      },
  },
    cardContainer
  );

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(res => {
  userInfo.setUserInfo(res[0]);
  userInfo.setUserAvatar(res[0]);
  const userId = res[0]._id;
  
  const cardsList = new Section({
    renderer: (item) => {
      console.log(item)//TODO:
      if (res[1]._id === userId) {
        const cardUser = new UserCard(
          item,
          { handleCardClick: () => {
            popupPhoto.open(item.name, item.link);
          },
            deleteCard: () => {
              popupDeleteCard.open();
          }},
          '#card-template');
          const cardElement = cardUser.generateCard();
          cardsList.addItem(cardElement);
      } else {
        const cardDefault = new DefaultCard(
          item,
          { handleCardClick: () => {
            popupPhoto.open(item.name, item.link);
          }},
          '#card-template-defaut');
          const cardElement = cardDefault.generateCard();
          cardsList.addItem(cardElement);
      }
    },
    },
      cardContainer
    );

  cardsList.renderItems(res[1]);

})



/** Всё, что связано с карточками */
// const cardsList = new Section({
//   renderer: (item) => {
//     console.log(item)//TODO:
//         const card = new Card(
//           item,
//           { handleCardClick: () => {
//             popupPhoto.open(item.name, item.link);
//           }},
//           '#card-template');
//           const cardElement = card.generateCard();
//           cardsList.addItem(cardElement);
//       },
//   },
//     cardContainer
// );

// api.getInitialCards()
// .then(res => cardsList.renderItems(res))

// api.getUserInfo().then((res) => {
//   console.log(res);//TODO:
//   userInfo.setUserInfo(res);
//   userInfo.setUserAvatar(res);
// })


const popupPhoto = new PopupWithImage(popupPhotoElement, popupPhotoImg, popupPhotoTitle);
popupPhoto.setEventListeners();

const popupDeleteCard = new PopupDeleteCard(popupDeleteCardElement);
popupDeleteCard.setEventListeners();
// /** Валидация */

const profileFormValid = new FormValidator(formValidationOptions, formProfileElement);
profileFormValid.enableValidation();

const placeFormValid = new FormValidator(formValidationOptions, formPlaceElement);
placeFormValid.enableValidation();


// /** Работа с формами */
 const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar'); //TODO: переделать на переменные

const popupProfile = new PopupWithForm(popupProfileElement,
  (values) => {
    api.editProfile(values).then(
      (res) => {
        userInfo.setUserInfo(res);
      }
    )
  },
 () => {
  profileFormValid.resetErrors();
});
popupProfile.setEventListeners();

// const popupPlace = new PopupWithForm(popupPlaceElement,
//   //функция при сабмите
//   (values) => {
//     console.log(values);//TODO:
//     api.createCard(values).then(
//       res => cardsList.renderNewItem(res)
//     )
//   },
//   //функция сброса ошибок
//   () => {
//     placeFormValid.resetErrors();
//   });
// popupPlace.setEventListeners();

// const addActualMeaningProfileForm = () => {
//   const {name, job} = userInfo.getUserInfo();
//   nameInput.value = name;
//   jobInput.value = job;
// }


// buttonEdit.addEventListener('click', () => {
//   addActualMeaningProfileForm();
//   popupProfile.open();
// });
// buttonAdd.addEventListener('click', () => popupPlace.open());
