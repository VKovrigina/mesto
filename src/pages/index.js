//спасибо большое код-ревьюеру! Хорошего вам дня :)
import {
  formProfileSelector,
  formPlaceSelector,
  formAvatarSelector,
  popupProfileSelector,
  popupPlaceSelector,
  buttonEditSelector,
  buttonAddSelector,
  nameInputSelector,
  jobInputSelector,
  cardContainer,
  formValidationOptions,
  popupPhotoSelector,
  popupDeleteSelector,
  popupPhotoImgSelector,
  popupPhotoTitleSelector,
  popupProfileAvatarSelector,
  avatarSelector,
  profileNameSelector,
  profileAboutSelector} from '../utils/constants.js';

import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupDelete from '../components/PopupDelete.js';
import UserCard from '../components/UserCard.js';
import DefaultCard from '../components/DefaultCard.js';
import './index.css';

/** формы */
const formProfileElement = document.querySelector(formProfileSelector);
const formPlaceElement = document.querySelector(formPlaceSelector);
const formAvatarElement = document.querySelector(formAvatarSelector);
/** попапы */
const popupProfileElement = document.querySelector(popupProfileSelector);
const popupPlaceElement = document.querySelector(popupPlaceSelector);
const popupPhotoElement = document.querySelector(popupPhotoSelector);
const popupDeleteElement = document.querySelector(popupDeleteSelector);
const popupProfileAvatar = document.querySelector(popupProfileAvatarSelector);
/** кнопки */
const buttonEdit = document.querySelector(buttonEditSelector);
const buttonAdd = document.querySelector(buttonAddSelector);
const avatarImg = document.querySelector(avatarSelector);
/** поля форм */
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


const userInfo = new UserInfo(profileNameSelector, profileAboutSelector, avatarSelector);

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(res => {
  userInfo.setUserInfo(res[0]);
  userInfo.setUserAvatar(res[0]);
  const userId = res[0]._id;

  const cardsList = new Section({
    renderer: (item) => {
      let isLiked = item.likes.some((like) => {
        return like._id === userId;
      })
      if (item.owner._id === userId) {
        const cardUser = new UserCard(
          item, isLiked,
          { handleCardClick: () => {
            popupPhoto.open(item.name, item.link);
            },
            deleteCard: (cardId) => {
              popupDelete.open();
              popupDelete.setHandleSubmit(() => {
                popupDelete.renderLoading(true)
                api.deleteCard(cardId)
                .then(() => {cardUser.delete()})
                .finally(() => popupDelete.renderLoading(false));
              })
            },
            putLike: (cardId) => {
              api.putLike(cardId)
              .then((res) => {
                cardUser.addLike(res.likes.length)
              })
            },
            deleteLike: (cardId) => {
              api.deleteLike(cardId)
              .then((res) => {
                cardUser.removeLike(res.likes.length)
              })
            }
          },
          '#card-template');
          const cardElement = cardUser.generateCard();
          cardsList.addItem(cardElement);
      } else {
        const cardDefault = new DefaultCard(
          item, isLiked,
          { handleCardClick: () => {
            popupPhoto.open(item.name, item.link);
          },
          putLike: (cardId) => {
            api.putLike(cardId)
            .then((res) => {
              cardDefault.addLike(res.likes.length)
            })
          },
          deleteLike: (cardId) => {
            api.deleteLike(cardId)
            .then((res) => {
              cardDefault.removeLike(res.likes.length)
            })
          }
          },
          '#card-template-defaut');
          const cardElement = cardDefault.generateCard();
          cardsList.addItem(cardElement);
      }
    },
    },
      cardContainer
  );
    cardsList.renderItems(res[1]);

  const popupPlace = new PopupWithForm(popupPlaceElement,
      /** функция при сабмите */
    (values) => {
      popupPlace.renderLoading(true)
      api.createCard(values)
      .then(res => cardsList.renderNewItem(res))
      .finally(() => popupPlace.renderLoading(false));
    },
      /** функция сброса ошибок */
    () => {
      placeFormValid.resetErrors();
    }
  );
  popupPlace.setEventListeners();
  buttonAdd.addEventListener('click', () => popupPlace.open());
})



const popupPhoto = new PopupWithImage(popupPhotoElement, popupPhotoImg, popupPhotoTitle);
popupPhoto.setEventListeners();

const popupDelete = new PopupDelete(popupDeleteElement);
popupDelete.setEventListeners();

 /** Валидация */

const profileFormValid = new FormValidator(formValidationOptions, formProfileElement);
profileFormValid.enableValidation();

const placeFormValid = new FormValidator(formValidationOptions, formPlaceElement);
placeFormValid.enableValidation();

const profileAvatarValid = new FormValidator(formValidationOptions, formAvatarElement);
profileAvatarValid.enableValidation();


 /** Работа с формами */

const popupProfile = new PopupWithForm(popupProfileElement,
  (values) => {
    popupProfile.renderLoading(true)
    api.editProfile(values)
    .then((res) => {
        userInfo.setUserInfo(res);
      }
    )
    .finally(() => popupProfile.renderLoading(false));
  },
 () => {
  profileFormValid.resetErrors();
});
popupProfile.setEventListeners();

const popupAvatar = new PopupWithForm(popupProfileAvatar,
  (values) => {
    popupAvatar.renderLoading(true)
    api.editAvatar(values)
    .then((res) => {
      userInfo.setUserAvatar(res);
    })
    .finally(() => popupAvatar.renderLoading(false));
  },
  () => {
    profileAvatarValid.resetErrors();
  }
)
popupAvatar.setEventListeners();

const addActualMeaningProfileForm = () => {
  const {name, job} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
}

buttonEdit.addEventListener('click', () => {
  addActualMeaningProfileForm();
  popupProfile.open();
});
avatarImg.addEventListener('click', () => {
  popupAvatar.open();
});

