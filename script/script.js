//спасибо большое код-ревьюеру! Хорошего вам дня :)
//формы
const formElement = document.querySelector('.popup__form');
const formPlaceElement = document.querySelector('.popup__form_place');
//попапы
const popupProfile = document.querySelector('.popup');
const popupPhoto = document.querySelector('.popup-photo');
const popupPlace = document.querySelector('.popup_place');
//кнопки
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close-button');
const buttonAdd = document.querySelector('.profile__add-button');
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

const initialCards = [
  {
      name: 'Камчатский край',
      link: 'https://images.unsplash.com/photo-1535427284698-c8e68a1eb910?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Москва',
      link: 'https://images.unsplash.com/photo-1567449303183-ae0d6ed1498e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
  },
  {
      name: 'Санкт-Петербург',
      link: 'https://images.unsplash.com/photo-1587507565493-817f6ceb1244?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//функция открытия-закрытия попапов, назначаю тип, так как два попапа сверстаны гридами, другой - флексом
function popupToggle(element, type) {
  return function() {
    if (!popupProfile.classList.contains('popup_open')) {
    nameInput.value = profileNameInput.textContent;
    jobInput.value = profileJobInput.textContent;
    }
    element.classList.toggle(type);
  }
}

function deleteCard() {
  event.target.closest('.cards__item').remove();
}
//функция добавления карточек
function addCard(imgValue, titleValue) {
  const cardTemplatePlace = document.querySelector('#card-template').content;
  const cardElement = cardTemplatePlace.cloneNode(true);
  cardElement.querySelector('.cards__img').src = imgValue;
  cardElement.querySelector('.cards__img').alt = titleValue;
  cardElement.querySelector('.cards__title').textContent = titleValue;
  //слушатель для активизации кнопки лайка
  cardElement.querySelector('.cards__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__button-like_active');
  });
  //слушатель для удаления карточки
  cardElement.querySelector('.cards__button-delete').addEventListener('click', deleteCard);
  //слушатель для открытия попапа с изображением
  cardElement.querySelector('.cards__img').addEventListener('click', function (evt) {
    popupPhoto.classList.toggle('popup-photo_open');
    popupPhotoImg.src = imgValue;
    popupPhotoImg.alt = titleValue;
    popupPhotoTitle.textContent = titleValue;
  });
  cardContainer.prepend(cardElement);
}
//вызов функции addCard для появления изночальных карточек из массива
initialCards.forEach(function (item) {
  addCard(item.link, item.name);
});
//функция отправки формы карточек
function formSubmitHandlerPlace(evt) {
  evt.preventDefault();

  addCard(imgInput.value, titleInput.value);
  popupPlace.classList.toggle('popup_open');
}
//функция отправки формы профиля
function formSubmitHandlerProfile (evt) {
  evt.preventDefault();
  //значения в тексте profile - из значений поля
  profileNameInput.textContent = nameInput.value;
  profileJobInput.textContent = jobInput.value;

  popupProfile.classList.toggle('popup_open');
}

buttonEdit.addEventListener('click', popupToggle(popupProfile, 'popup_open'));
buttonAdd.addEventListener('click', popupToggle(popupPlace, 'popup_open'));
buttonClose.addEventListener('click', popupToggle(popupProfile, 'popup_open'));
buttonClosePlace.addEventListener('click', popupToggle(popupPlace, 'popup_open'));
buttonClosePhoto.addEventListener('click', popupToggle(popupPhoto, 'popup-photo_open'));
formElement.addEventListener('submit', formSubmitHandlerProfile);
formPlaceElement.addEventListener('submit', formSubmitHandlerPlace);
