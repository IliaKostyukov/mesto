import { initialCards } from "./cards.js";
import {
  toggleButtonDisabledState,
  isValid,
  hideInputError,
  elements,
} from "./validation.js";

const buttonProfileEdit = document.querySelector(".profile__edit-button");
const buttonProfileAdd = document.querySelector(".profile__add-button");
const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-place");
const popupFigure = document.querySelector(".popup_type_figure");
const formEdit = document.querySelector(".popup__form_type_edit");
const formAdd = document.querySelector(".popup__form_type_add");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_info");
const nameTitle = document.querySelector(".profile__title");
const jobTitle = document.querySelector(".profile__subtitle");
const inputPlace = document.querySelector(".popup__input_type_place");
const inputUrl = document.querySelector(".popup__input_type_url");
const cardsContainer = document.querySelector(".elements__list");
const figureImage = document.querySelector(".popup__image");
const figureCaption = document.querySelector(".popup__caption");
const templateElement = document.querySelector(".template").content;
const inputList = Array.from(formAdd.querySelectorAll(elements.inputSelector));

// open and close popup action

const closePopupEscButton = (evt) => {
  if (evt.key.toLowerCase() === "escape") {
    const popup = document.querySelector(".popup_active");
    closePopup(popup);
  }
};

const openPopup = (popup) => {
  document.addEventListener("keydown", closePopupEscButton);
  popup.classList.add("popup_active");
};

const closePopup = (popup) => {
  document.removeEventListener("keydown", closePopupEscButton);
  popup.classList.remove("popup_active");
};

popups.forEach((item) => {
  item.addEventListener("mousedown", (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close-button")
    ) {
      closePopup(evt.currentTarget);
    }
  });
});

const handlePopupEdit = (popupEdit) => {
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobTitle.textContent;

  const inputList = Array.from(
    formEdit.querySelectorAll(elements.inputSelector)
  );
  inputList.forEach((input) => {
    isValid(popupEdit, input, elements);
  });

  const saveButton = formEdit.querySelector(elements.submitButtonSelector);
  toggleButtonDisabledState(inputList, saveButton, elements);

  openPopup(popupEdit);
};

const handlePopupAdd = (popupAdd) => {
  formAdd.reset();
  inputList.forEach((input) => {
    hideInputError(popupAdd, input, elements);
  });
  openPopup(popupAdd);
};

// form functionality

const submitFormEdit = (evt) => {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobTitle.textContent = jobInput.value;
  closePopup(popupEdit);
};

const likeButtonAction = (cardElement) => {
  const likeBtn = cardElement.querySelector(".element__like-button");
  likeBtn.addEventListener("click", (evt) => {
    evt.target.classList.toggle("element__like-button_active");
  });
};

const openCardAction = (name, link, cardImage) => {
  cardImage.addEventListener("click", () => {
    figureImage.src = link;
    figureImage.alt = name;
    figureCaption.textContent = name;

    openPopup(popupFigure);
  });
};

const removeCardAction = (cardElement) => {
  const buttonTrash = cardElement.querySelector(".element__trash-button");
  buttonTrash.addEventListener("click", (evt) => {
    const element = evt.target.closest(".element");
    element.remove();
  });
};

const createCard = (cardData) => {
  const cardElement = templateElement.querySelector(".element").cloneNode(true);
  const cardImage = cardElement.querySelector(".element__image");
  const cardCaption = cardElement.querySelector(".element__caption");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardCaption.textContent = cardData.name;

  openCardAction(cardData.name, cardData.link, cardImage);
  removeCardAction(cardElement);
  likeButtonAction(cardElement);

  return cardElement;
};

initialCards.forEach((item) => {
  const card = createCard(item);
  cardsContainer.append(card);
});

const submitFormAdd = (evt) => {
  evt.preventDefault();
  const cardData = {
    name: inputPlace.value,
    link: inputUrl.value,
  };
  const card = createCard(cardData);
  cardsContainer.prepend(card);
  closePopup(popupAdd);
  formAdd.reset();
  const saveButton = formAdd.querySelector(elements.submitButtonSelector);
  toggleButtonDisabledState(inputList, saveButton, elements);
};

buttonProfileEdit.addEventListener("click", () => handlePopupEdit(popupEdit));
buttonProfileAdd.addEventListener("click", () => handlePopupAdd(popupAdd));
formEdit.addEventListener("submit", submitFormEdit);
formAdd.addEventListener("submit", submitFormAdd);
