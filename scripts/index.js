//спасибо большое код-ревьюеру! Хорошего вам дня :)
//формы
const formElement = document.querySelector('.popup__form');
const formProfileElement = document.querySelector('.popup__form_profile');
const formPlaceElement = document.querySelector('.popup__form_place');
//попапы
const popupProfile = document.querySelector('.popup');
const popupPhoto = document.querySelector('.popup-photo');
const popupPlace = document.querySelector('.popup_place');
//кнопки
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close-button');
const buttonAdd = document.querySelector('.profile__add-button');
const submitButton = document.querySelector('.popup__form-button');
const buttonClosePhoto = document.querySelector('.popup-photo__button');
const buttonClosePlace = document.querySelector('.popup__close-button_place');
//поля форм
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let titleInput = formPlaceElement.querySelector('.popup__input_type_title');
let imgInput = formPlaceElement.querySelector('.popup__input_type_img');
//элементы, куда должны быть вставлены значения полей
let profileNameInput = document.querySelector('.profile__name');
let profileJobInput = document.querySelector('.profile__job');
let popupPhotoImg = document.querySelector('.popup-photo__img');
let popupPhotoTitle = document.querySelector('.popup-photo__title');
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

//функция открытия-закрытия попапов, назначаю тип, так как два попапа сверстаны гридами, другой - флексом
function popupToggle(popup, type) {
  return function() {
    popup.classList.add(type);
    if (popup.classList.contains('popup_profile')) {
      hideInputError(nameInput, formValidationOptions.inputErrorClass);
      hideInputError(jobInput, formValidationOptions.inputErrorClass);
      toggleClassButton(formProfileElement, submitButton, formValidationOptions.inactiveButtonClass);
    }
    if (popup.classList.contains('popup_place')) {
      hideInputError(titleInput, formValidationOptions.inputErrorClass);
      hideInputError(imgInput, formValidationOptions.inputErrorClass);
      formPlaceElement.reset();
      toggleClassButton(formPlaceElement, submitButton, formValidationOptions.inactiveButtonClass);
    }
  }
}

const closePopup = (evt) => {
  if(evt.target.classList.contains('popup_open') || evt.target.classList.contains('popup__close-button')){
    evt.target.closest('.popup').classList.remove('popup_open');
  }

  if(evt.target.classList.contains('popup-photo_open') || evt.target.classList.contains('popup-photo__button')){
    evt.target.closest('.popup-photo').classList.remove('popup-photo_open');
  }
}

const closePopupEsc = (evt) => {
  if(event.key === 'Escape') {
    if (document.querySelector('.popup_open')) {
      document.querySelector('.popup_open').classList.remove('popup_open');
    }

    if (document.querySelector('.popup-photo_open')) {
      document.querySelector('.popup-photo_open').classList.remove('popup-photo_open');
    }
  }
}

//функция создания карточек
function createCard(imgValue, titleValue) {
  const cardTemplatePlace = document.querySelector('#card-template').content;
  const cardElement = cardTemplatePlace.cloneNode(true);
  cardElement.querySelector('.cards__img').src = imgValue;
  cardElement.querySelector('.cards__img').alt = titleValue;
  cardElement.querySelector('.cards__title').textContent = titleValue;
  //слушатель для активизации кнопки лайка
  cardElement.querySelector('.cards__button-like').addEventListener('click', toggleLike);
  //слушатель для удаления карточки
  cardElement.querySelector('.cards__button-delete').addEventListener('click', deleteCard);
  //слушатель для открытия попапа с изображением
  cardElement.querySelector('.cards__img').addEventListener('click', openPreview(imgValue, titleValue));
  return cardElement;
}

function deleteCard() {
  event.target.closest('.cards__item').remove();
}

function toggleLike() {
  event.target.classList.toggle('cards__button-like_active');
}

function openPreview(imgValue, titleValue) {
  return function() {
  popupPhoto.classList.toggle('popup-photo_open');
  popupPhotoImg.src = imgValue;
  popupPhotoImg.alt = titleValue;
  popupPhotoTitle.textContent = titleValue;
  }
}

//функция добавления карточки в начало контейнера
const prependCard = (imgValue, titleValue) => {
  cardContainer.prepend(createCard(imgValue, titleValue));
}

//функция отправки формы карточек
function formSubmitHandlerPlace(evt) {
  evt.preventDefault();

  prependCard(imgInput.value, titleInput.value);
  popupPlace.classList.toggle('popup_open');
}
//функция для появления актуальных значений в попапе профиля
function handleProfileFormSubmit() {
  nameInput.value = profileNameInput.textContent;
  jobInput.value = profileJobInput.textContent;
}
//функция отправки формы профиля
function formSubmitHandlerProfile (evt) {
  evt.preventDefault();
  //значения в тексте profile - из значений поля
  profileNameInput.textContent = nameInput.value;
  profileJobInput.textContent = jobInput.value;

  popupProfile.classList.toggle('popup_open');
}

//вызов функции addCard для появления изночальных карточек из массива
initialCards.forEach(function (item) {
  prependCard(item.link, item.name);
});

buttonEdit.addEventListener('click', handleProfileFormSubmit);
buttonEdit.addEventListener('click', popupToggle(popupProfile, 'popup_open'));
buttonAdd.addEventListener('click', popupToggle(popupPlace, 'popup_open'));
//buttonClose.addEventListener('click', popupToggle(popupProfile, 'popup_open'));
//buttonClosePlace.addEventListener('click', popupToggle(popupPlace, 'popup_open'));
//buttonClosePhoto.addEventListener('click', popupToggle(popupPhoto, 'popup-photo_open'));
formElement.addEventListener('submit', formSubmitHandlerProfile);
formPlaceElement.addEventListener('submit', formSubmitHandlerPlace);
document.addEventListener('click', closePopup);
document.addEventListener('keydown', closePopupEsc);

enableValidation(formValidationOptions);
