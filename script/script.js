const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
const popup = document.querySelector('.popup');
//поля формы
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
// Выберите элементы, куда должны быть вставлены значения полей
let profileNameInput = document.querySelector('.profile__name');
let profileJobInput = document.querySelector('.profile__job');

function popupOpenClose() {
  //значения полей - из текста в profile
  if (!popup.classList.contains('popup_opened')) {
    nameInput.value = profileNameInput.textContent;
    jobInput.value = profileJobInput.textContent;
  }

  popup.classList.toggle('popup_open');
}

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
