// Находим форму в DOM
let buttonEdit = document.querySelector('.profile__edit-button');
let buttonClose = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let popup = document.querySelector('.popup');// Воспользуйтесь методом querySelector()

function popupOpen() {
  popup.classList.add('popup_open');
  formElement.addEventListener('submit', formSubmitHandler);
  buttonClose.addEventListener('click', popupClose);
}

function popupClose() {
  popup.classList.remove('popup_open');
}

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = formElement.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
    let jobInput = formElement.querySelector('.popup__input_type_job');// Воспользуйтесь инструментом .querySelector()
    // Получите значение полей из свойства value
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let profileNameInput = document.querySelector('.profile__name');
    let profileJobInput = document.querySelector('.profile__job');
    // Вставьте новые значения с помощью textContent
    profileNameInput.textContent = nameInputValue;
    profileJobInput.textContent = jobInputValue;

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

buttonEdit.addEventListener('click', popupOpen);
//buttonClose.addEventListener('click', popupClose);
//formElement.addEventListener('submit', formSubmitHandler);
