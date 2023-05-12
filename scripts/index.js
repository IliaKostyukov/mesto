const buttonLike = document.querySelectorAll('.element__like-button');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const buttonPopupClose = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_info');
const nameTitle = document.querySelector('.profile__title');
const jobTitle = document.querySelector('.profile__subtitle');

// like button style toggle

for (let i = 0; i < buttonLike.length; i++) {
  buttonLike[i].addEventListener('click', () => {
    buttonLike[i].classList.toggle('element__like-button_active');
  });
}

// open and close popup action

buttonProfileEdit.addEventListener('click', () => {
  popup.classList.add('popup__active');
});

function closePopup() {
  popup.classList.remove('popup__active');
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobTitle.textContent
}

buttonPopupClose.addEventListener('click', closePopup);

popup.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup();
  }
});

// form functionality

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobTitle.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
