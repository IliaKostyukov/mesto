import { initialCards } from "../utils/cards-data.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import "../pages/index.css";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  selectorData,
  buttonProfileEdit,
  buttonProfileAdd,
  popupEditSelector,
  popupAddSelector,
  popupFigureSelector,
  formEdit,
  formAdd,
  nameInput,
  jobInput,
  formEditInputSelectors,
  cardsContainerSelector,
  templateSelector,
} from "../utils/const.js";

const userInfo = new UserInfo(formEditInputSelectors);

// Edit popup

const popupWithFormEdit = new PopupWithForm(popupEditSelector, (data) => {
  userInfo.setUserInfo(data);
  popupWithFormEdit.close();
});

const handlePopupEdit = () => {
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  formValidationEdit.checkInputValidity();
  formValidationEdit.toggleButtonDisabledState();
  popupWithFormEdit.open();
};

const formValidationEdit = new FormValidator(selectorData, formEdit);
formValidationEdit.enableValidation();

// Add popup

const popupWithFormAdd = new PopupWithForm(popupAddSelector, (data) => {
  const newUserCard = generateNewCard(
    { name: data["type_place"], link: data["type_url"] },
    templateSelector,
    handleCardClick
  );
  const newCard = newUserCard.renderCard();
  newElements.addItem(newCard);
  popupWithFormAdd.close();
});

const handlePopupAdd = () => {
  formValidationAdd.resetError();
  formValidationAdd.toggleButtonDisabledState();
  popupWithFormAdd.open();
};

const formValidationAdd = new FormValidator(selectorData, formAdd);
formValidationAdd.enableValidation();

// Figure popup

const popupFigure = new PopupWithImage(popupFigureSelector);

const handleCardClick = (image, link, name) => {
  image.addEventListener("click", () => {
    popupFigure.open(link, name);
  });
};

const generateNewCard = (data, templateSelector, func) => {
  return new Card(data, templateSelector, func);
};

// Render default cards

const newElements = new Section(
  {
    renderer: (data) => {
      const newCard = generateNewCard(data, templateSelector, handleCardClick);
      return newCard.renderCard();
    },
  },
  cardsContainerSelector
);
newElements.renderElements(initialCards);

// Listeners

buttonProfileEdit.addEventListener("click", () => handlePopupEdit());
buttonProfileAdd.addEventListener("click", () => handlePopupAdd());
popupWithFormAdd.setEventListeners();
popupFigure.setEventListeners();
popupWithFormEdit.setEventListeners();
