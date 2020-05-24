const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
const formPlaceElement = document.querySelector('.popup__form_place');
const popup = document.querySelector('.popup');
const deleteCardButton = document.querySelector('.cards__button-delete');
//модификатор для попапа с картачками
const popupPlace = document.querySelector('.popup_place');
const buttonAdd = document.querySelector('.profile__add-button');
//модификатор для книпки закрыть
const buttonClosePlace = document.querySelector('.popup__close-button_place');
//поля форм
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let titleInput = formPlaceElement.querySelector('.popup__input_type_title');
let imgInput = formPlaceElement.querySelector('.popup__input_type_img');
// Выберите элементы, куда должны быть вставлены значения полей
let profileNameInput = document.querySelector('.profile__name');
let profileJobInput = document.querySelector('.profile__job');
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
      link: 'https://images.unsplash.com/photo-1550643749-d9add3db05e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//функция закрытия-открытия попапа для добавления карточек
function popupOpenClosePlace() {
  popupPlace.classList.toggle('popup_open-place');
}

function deleteCard() {
  event.target.closest('.cards__item').remove();
}
//функция добавления карточек
function addCard(imgValue, titleValue) {
  //выбрали шаблон
  const cardTemplatePlace = document.querySelector('#card-template').content;
  //клонировали шаблон
  const cardElement = cardTemplatePlace.cloneNode(true);
  //добавили cardElement путь к изображению
  cardElement.querySelector('.cards__img').src = imgValue;
  //добавили cardElement текст карточки
  cardElement.querySelector('.cards__title').textContent = titleValue;
  //слушатель для активизации кнопки лайка
  cardElement.querySelector('.cards__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__button_active');
  });
  cardElement.querySelector('.cards__button-delete').addEventListener('click', deleteCard);
  cardContainer.prepend(cardElement);
}
//вызов функции addCard для появления изночальных карточек из массива
initialCards.forEach(function (item) {
  addCard(item.link, item.name);
});
//функция отправки формы карточек
function formPlaceSubmitHandler(evt) {
  evt.preventDefault();

  addCard(imgInput.value, titleInput.value);
  popupOpenClosePlace()
}
//функция открытия-закрытия попапа профиля
function popupOpenClose() {
  //значения полей - из текста в profile
  if (!popup.classList.contains('popup_open')) {
    nameInput.value = profileNameInput.textContent;
    jobInput.value = profileJobInput.textContent;
  }

  popup.classList.toggle('popup_open');
}
//функция отправки формы профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  //значения в тексте profile - из значений поля
  profileNameInput.textContent = nameInput.value;
  profileJobInput.textContent = jobInput.value;

  popupOpenClose();
}

buttonEdit.addEventListener('click', popupOpenClose);
formElement.addEventListener('submit', formSubmitHandler);
buttonClose.addEventListener('click', popupOpenClose);
buttonAdd.addEventListener('click', popupOpenClosePlace);
buttonClosePlace.addEventListener('click', popupOpenClosePlace);
formPlaceElement.addEventListener('submit', formPlaceSubmitHandler);
