//спасибо большое код-ревьюеру! Хорошего вам дня :)
//формы
const formProfileElement = document.querySelector('.popup__form_profile');
const formPlaceElement = document.querySelector('.popup__form_place');
//попапы
const popupProfile = document.querySelector('.popup_profile');
const popupPhoto = document.querySelector('.popup-photo');
const popupPlace = document.querySelector('.popup_place');
const popupForm = document.querySelector('.popup');
//const popupOpenClass = document.querySelector('.popup_open');
//const popupPhotoOpenClass = document.querySelector('.popup-photo_open');
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
const popupPhotoImg = document.querySelector('.popup-photo__img');
const popupPhotoTitle = document.querySelector('.popup-photo__title');
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
    addListenersPopupClose(popup);
    if (document.querySelector('.popup_profile') && document.querySelector('.popup_open')) {
      addInitialStateProfile(popupProfile);
    }
    if (document.querySelector('.popup_place') && document.querySelector('.popup_open')) {
      addInitialStatePlace(popupPlace);
    }
  }
}

const closePopup = (popup) => {
  if (document.querySelector('.popup_open')) {
    popup.classList.remove('popup_open');
  }
  if (document.querySelector('.popup-photo_open')) {
    popup.classList.remove('popup-photo_open');
  }

  removeListenersPopupClose(popup);
}

const closePopupClick = (evt) => {
  if(evt.target.classList.contains('popup_open') || evt.target.classList.contains('popup__close-button') ||
  evt.target.classList.contains('popup-photo_open') || evt.target.classList.contains('popup-photo__button')) {
    closePopup(document.querySelector('.popup_open') || document.querySelector('.popup-photo_open'));
  }
}

const closePopupEsc = (evt) => {
  if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_open') || document.querySelector('.popup-photo_open'));
  }
}

//добавление слушателей закрытия попапа
const addListenersPopupClose = (popup) => {
  popup.addEventListener('click', closePopupClick);
  document.addEventListener('keydown', closePopupEsc);
}
//удаление слушателей
const removeListenersPopupClose = (popup) => {
  document.removeEventListener('keydown', closePopupEsc);
  popup.removeEventListener('click', closePopupClick);
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
  addCardListeners(cardButtonDelete, cardButtonLike, cardImg, imgValue, titleValue);
  return cardElement;
}

const addCardListeners = (buttonDelete, buttonLike, img, imgValue, titleValue) => {
  buttonDelete.addEventListener('click', (evt) => deleteCard(evt, buttonDelete, buttonLike, img));
  buttonLike.addEventListener('click', toggleLike);
  img.addEventListener('click', addPreviewValue(imgValue, titleValue));
  img.addEventListener('click', popupOpen(popupPhoto, 'popup-photo_open'));
}

const removeCardListeners = (evt, buttonDelete, buttonLike, img) => {
    buttonDelete.removeEventListener('click', deleteCard);
    buttonLike.removeEventListener('click', toggleLike);
    img.removeEventListener('click', addPreviewValue);
    img.removeEventListener('click', popupOpen);
}

function deleteCard(evt, buttonDelete, buttonLike, img) {
  evt.target.closest('.cards__item').remove();
  removeCardListeners(evt, buttonDelete, buttonLike, img);
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
function formSubmitHandlerPlace(evt, popup) {
  evt.preventDefault();

  prependCard(imgInput.value, titleInput.value);
  closePopup(popup, 'popup_open');
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
function formSubmitHandlerProfile (evt, popup) {
  evt.preventDefault();
  //значения в тексте profile - из значений поля
  profileNameInput.textContent = nameInput.value;
  profileJobInput.textContent = jobInput.value;

  closePopup(popup, 'popup_open');
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
formProfileElement.addEventListener('submit', (evt) => formSubmitHandlerProfile(evt, popupProfile));
formPlaceElement.addEventListener('submit', (evt) => formSubmitHandlerPlace(evt, popupPlace));

enableValidation(formValidationOptions);
