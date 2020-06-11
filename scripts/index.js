//спасибо большое код-ревьюеру! Хорошего вам дня :)
//формы
//const formElement = document.querySelector('.popup__form');
const formProfileElement = document.querySelector('.popup__form_profile');
const formPlaceElement = document.querySelector('.popup__form_place');
//попапы
const popupProfile = document.querySelector('.popup_profile');
const popupPhoto = document.querySelector('.popup-photo');
const popupPlace = document.querySelector('.popup_place');
//кнопки
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
//поля форм
const inputArray = Array.from(document.querySelectorAll('.popup__input'));
let nameInput = formProfileElement.querySelector('.popup__input_type_name');
let jobInput = formProfileElement.querySelector('.popup__input_type_job');
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
// -------------------- Всё, что связано с открытием-закрытием попапов--------------------------

//функция открытия попапов, назначаю тип, так как два попапа сверстаны гридами, другой - флексом
function popupOpen(popup, type) {
  return function() {
    popup.classList.add(type);
    addListenerPopupClose(popup);
    if (popupProfile) {
      addInitialStateProfile(popupProfile);
    }
    if (popupPlace) {
      addInitialStatePlace(popupPlace);
    }
  }
}

const closePopup = (evt) => {
  removeListenerPopupCloseEsc();
  if(evt.target.classList.contains('popup_open') || evt.target.classList.contains('popup__close-button') ||  evt.target.classList.contains('popup__form-button')){
    evt.target.closest('.popup').classList.remove('popup_open');
  }

  if(evt.target.classList.contains('popup-photo_open') || evt.target.classList.contains('popup-photo__button')){
    evt.target.closest('.popup-photo').classList.remove('popup-photo_open');
  }
}

const closePopupEsc = (evt) => {
  if(evt.key === 'Escape') {
    if (document.querySelector('.popup_open')) {
      document.querySelector('.popup_open').classList.remove('popup_open');
    }

    if (document.querySelector('.popup-photo_open')) {
      document.querySelector('.popup-photo_open').classList.remove('popup-photo_open');
    }
    removeListenerPopupCloseEsc();
  }
}

//добавление слушателя закрытия попапа
const addListenerPopupClose = (popup) => {
  popup.addEventListener('click', closePopup);
  document.addEventListener('keydown', closePopupEsc);
}

const removeListenerPopupCloseEsc = () => {
  document.removeEventListener('keydown', closePopupEsc);
}

// -------------------- Всё, что связано с карточками--------------------------

//функция создания карточек
function createCard(imgValue, titleValue) {
  const cardTemplatePlace = document.querySelector('#card-template').content;
  const cardElement = cardTemplatePlace.cloneNode(true);
  const cardImg = cardElement.querySelector('.cards__img');
  const cardTitle = cardElement.querySelector('.cards__title');
  const cardButtonLike = cardElement.querySelector('.cards__button-like');
  const cardButtonDelete = cardElement.querySelector('.cards__button-delete');
  cardImg.src = imgValue;
  cardImg.alt = titleValue;
  cardTitle.textContent = titleValue;
  //слушатель для активизации кнопки лайка
  cardButtonLike.addEventListener('click', toggleLike);
  //слушатель для удаления карточки
  cardButtonDelete.addEventListener('click', deleteCard);
  //слушатель для открытия попапа с изображением
  cardImg.addEventListener('click', addPreviewValue(imgValue, titleValue));
  cardImg.addEventListener('click', popupOpen(popupPhoto, 'popup-photo_open'));
  return cardElement;
}

function deleteCard() {
  event.target.closest('.cards__item').remove();
}

function toggleLike() {
  event.target.classList.toggle('cards__button-like_active');
}

function addPreviewValue(imgValue, titleValue) {
  return function() {
  popupPhotoImg.src = imgValue;
  popupPhotoImg.alt = titleValue;
  popupPhotoTitle.textContent = titleValue;
  }
}

//функция добавления карточки в начало контейнера
const prependCard = (imgValue, titleValue) => {
  cardContainer.prepend(createCard(imgValue, titleValue));
}

// -------------------- Всё, что связано с формами--------------------------

//функция отправки формы карточек
function formSubmitHandlerPlace(evt) {
  evt.preventDefault();

  prependCard(imgInput.value, titleInput.value);
  closePopup(evt);
}

const addInitialStatePlace = (popup) => {
  const arrayInput = Array.from(popup.querySelectorAll('.popup__input'));
  arrayInput.forEach(input => {
    hideInputError(input, formValidationOptions.inputErrorClass);
  })
  formPlaceElement.reset();
  toggleClassButton(formPlaceElement, formValidationOptions.submitButtonSelector, formValidationOptions.inactiveButtonClass);
}

//функция отправки формы профиля
function formSubmitHandlerProfile (evt) {
  evt.preventDefault();
  //значения в тексте profile - из значений поля
  profileNameInput.textContent = nameInput.value;
  profileJobInput.textContent = jobInput.value;

  closePopup(evt);
}

const addInitialStateProfile = (popup) => {
  const arrayInput = Array.from(popup.querySelectorAll('.popup__input'));
  arrayInput.forEach(input => {
    hideInputError(input, formValidationOptions.inputErrorClass);
  })
  handleProfileFormSubmit();
  toggleClassButton(formProfileElement, formValidationOptions.submitButtonSelector, formValidationOptions.inactiveButtonClass);
}

//функция для появления актуальных значений в попапе профиля
function handleProfileFormSubmit() {
  nameInput.value = profileNameInput.textContent;
  jobInput.value = profileJobInput.textContent;
}

//вызов функции addCard для появления изночальных карточек из массива
initialCards.forEach(function (item) {
  prependCard(item.link, item.name);
});


buttonEdit.addEventListener('click', popupOpen(popupProfile, 'popup_open'));
buttonAdd.addEventListener('click', popupOpen(popupPlace, 'popup_open'));
formProfileElement.addEventListener('submit', formSubmitHandlerProfile);
formPlaceElement.addEventListener('submit', formSubmitHandlerPlace);

enableValidation(formValidationOptions);
