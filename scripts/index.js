import {initialCards} from "./cards.js";

const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonProfileAdd = document.querySelector('.profile__add-button');
const popup = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-place');
const popupFigure = document.querySelector('.popup_type_figure');
const buttonPopupClose = document.querySelectorAll('.popup__close-button');
const formEdit = document.querySelector('.popup__form_type_edit');
const formAdd = document.querySelector('.popup__form_type_add');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_info');
const nameTitle = document.querySelector('.profile__title');
const jobTitle = document.querySelector('.profile__subtitle');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputUrl = document.querySelector('.popup__input_type_url');
const elementsList = document.querySelector('.elements__list');

// open and close popup action

  const togglePopup = currentPopup => currentPopup.classList.toggle('popup_active');

  popup.forEach(item => {
    item.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        togglePopup(evt.currentTarget);
      }
    })
  });

  const handlePopupEdit = popupEdit => {
    nameInput.value = nameTitle.textContent;
    jobInput.value = jobTitle.textContent;
    togglePopup(popupEdit);
  }

  const handlePopupAdd = popupAdd => {
    inputPlace.value = '';
    inputUrl.value = '';
    togglePopup(popupAdd);
  }

  buttonPopupClose.forEach(item => {
    const parrentPopup = item.closest('.popup');
    item.addEventListener('click', () => togglePopup(parrentPopup));
  });

// form functionality

const submitFormEdit = (evt) => {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobTitle.textContent = jobInput.value;
  togglePopup(popupEdit);
}

const buttonLikeAction = (cardElement) => {
  const likeBtn = cardElement.querySelector('.element__like-button');
  likeBtn.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-button_active')
  });
}

const cardOpenAction = (name, link, cardImage) => {
  cardImage.addEventListener('click', () => {
    const figureImage = document.querySelector('.popup__image');
    const figureCaption = document.querySelector('.popup__caption');

    figureImage.src = link;
    figureCaption.textContent = name;

    togglePopup(popupFigure)
  });
}

const cardRemoveAction = (cardElement) => {
  const buttonTrash = cardElement.querySelector('.element__trash-button');
  buttonTrash.addEventListener('click', evt => {
    const element = evt.target.closest('.element');
    element.remove();
  })
}

const createCard = (name, link) => {
  const templateElement = document.querySelector('.template').content;
  const cardElement = templateElement.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardCaption = cardElement.querySelector('.element__caption');

  cardImage.src = link;
  cardCaption.textContent = name;

  cardOpenAction(name, link, cardImage);
  cardRemoveAction(cardElement);
  buttonLikeAction(cardElement);

  return cardElement;
}

initialCards.forEach(item => {
  const card = createCard(item.name, item.link);
  elementsList.append(card);
})

const submitFormAdd = (evt) => {
  evt.preventDefault();
  const card = createCard(inputPlace.value, inputUrl.value);
  elementsList.prepend(card);
  togglePopup(popupAdd);
}

buttonProfileEdit.addEventListener('click', () => handlePopupEdit(popupEdit));
buttonProfileAdd.addEventListener('click', () => handlePopupAdd(popupAdd));
formEdit.addEventListener('submit', submitFormEdit);
formAdd.addEventListener('submit', submitFormAdd);
