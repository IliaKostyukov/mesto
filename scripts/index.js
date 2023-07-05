import { initialCards } from "./cards-data.js";
import { FormValidator, elements } from "./FormValidator.js";
import { Card } from "./Card.js"

const buttonProfileEdit = document.querySelector(".profile__edit-button");
const buttonProfileAdd = document.querySelector(".profile__add-button");
const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-place");
const popupFigure = document.querySelector(".popup_type_figure");
const figureImage = document.querySelector(".popup__image");
const figureCaption = document.querySelector(".popup__caption");
const formEdit = document.querySelector(".popup__form_type_edit");
const formAdd = document.querySelector(".popup__form_type_add");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_info");
const nameTitle = document.querySelector(".profile__title");
const jobTitle = document.querySelector(".profile__subtitle");
const inputPlace = document.querySelector(".popup__input_type_place");
const inputUrl = document.querySelector(".popup__input_type_url");
const cardsContainer = document.querySelector(".elements__list");
const templateSelector = ".template";

// close popup on esc button

const closePopupEscButton = (evt) => {
  if (evt.key.toLowerCase() === "escape") {
    const popup = document.querySelector(".popup_active");
    closePopup(popup);
  }
};

// open popup function

const openPopup = (popup) => {
  document.addEventListener("keydown", closePopupEscButton);
  popup.classList.add("popup_active");
};

//close popup function

const closePopup = (popup) => {
  document.removeEventListener("keydown", closePopupEscButton);
  popup.classList.remove("popup_active");
};

// close popup outside form/image function and on close button

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

// edit form handler

const handlePopupEdit = (popupEdit) => {
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobTitle.textContent;
  formValidationEdit.checkInputValidity();
  formValidationEdit.toggleButtonDisabledState();
  openPopup(popupEdit);
};

// form add handler

const handlePopupAdd = (popupAdd) => {
  formValidationAdd.resetForm();
  formValidationAdd.resetError();
  formValidationAdd.toggleButtonDisabledState();
  openPopup(popupAdd);
};

// edit form functionality

const submitFormEdit = (evt) => {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobTitle.textContent = jobInput.value;
  closePopup(popupEdit);
};

// open figure popup function

const openCardAction = (name, link, cardImage) => {
  cardImage.addEventListener("click", () => {
    figureImage.src = link;
    figureImage.alt = name;
    figureCaption.textContent = name;

    openPopup(popupFigure);
  });
};

// render default cards

initialCards.forEach((item) => {
  const card = new Card(item, templateSelector, openCardAction);
  const cardElement = card.renderCard();
  cardsContainer.append(cardElement);
});

// add new user's card function

const submitFormAdd = (evt) => {
  evt.preventDefault();
  const cardData = {
    name: inputPlace.value,
    link: inputUrl.value,
  };
  const card = new Card(cardData, templateSelector, openCardAction);
  const cardElement = card.renderCard();
  cardsContainer.prepend(cardElement);
  closePopup(popupAdd);
  formValidationAdd.resetForm();
};

const formValidationEdit = new FormValidator(elements, formEdit);
formValidationEdit.enableValidation();
const formValidationAdd = new FormValidator(elements, formAdd);
formValidationAdd.enableValidation();

buttonProfileEdit.addEventListener("click", () => handlePopupEdit(popupEdit));
buttonProfileAdd.addEventListener("click", () => handlePopupAdd(popupAdd));
formEdit.addEventListener("submit", submitFormEdit);
formAdd.addEventListener("submit", submitFormAdd);
