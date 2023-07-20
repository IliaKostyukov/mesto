import { initialCards } from "./cards-data.js";
import { FormValidator, elements } from "./FormValidator.js";
import { Card } from "./Card.js";
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import '../pages/index.css';
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

const buttonProfileEdit = document.querySelector(".profile__edit-button");
const buttonProfileAdd = document.querySelector(".profile__add-button");
const popupEditSelector = ".popup_type_edit";
const popupAddSelector = ".popup_type_new-place";
const popupFigureSelector = '.popup_type_figure';
const popupFigureElement = document.querySelector(popupFigureSelector);
const formEdit = document.forms["profile-form"];
const formAdd = document.forms["card-form"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_info");
const formEditInputSelectors = {
  nameSelector: ".profile__title",
  infoSelector: ".profile__subtitle"
};
const cardsContainerSelector = ".elements__list";
const templateSelector = ".template";

const userInfo = new UserInfo(formEditInputSelectors);
const popupEdit = new Popup(popupEditSelector);

const popupWithFormEdit = new PopupWithForm(popupEditSelector, (data) => {
    userInfo.setUserInfo(data);
    popupWithFormEdit.close();
    });
popupWithFormEdit.setEventListeners();

const handlePopupEdit = () => {
  const {name, about} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  formValidationEdit.checkInputValidity();
  formValidationEdit.toggleButtonDisabledState();
  popupWithFormEdit.open();
};

const popupAdd = new Popup(popupAddSelector);

const handlePopupAdd = (popupWithFormAdd) => {
  popupWithFormAdd.setEventListeners();
  formValidationAdd.resetForm();
  formValidationAdd.resetError();
  formValidationAdd.toggleButtonDisabledState();
  popupWithFormAdd.open();
};

const popupFigure = new PopupWithImage(popupFigureSelector);

const handleCardClick = (image, link, name) => {
  image.addEventListener('click', () => {
    popupFigure.setEventListeners();
    popupFigure.open(link, name);
    popupFigureElement.classList.add('popup_active');
  })
}

const newElements = new Section({items: initialCards, renderer: (data) => {
  const newCard = new Card(data, templateSelector, handleCardClick);
  return newCard.renderCard();
}}, cardsContainerSelector);
newElements.renderElements();


const popupWithFormAdd = new PopupWithForm(popupAddSelector, (data) => {
  const newUserCard = new Card({'name': data['type_place'], 'link': data['type_url']}, templateSelector, handleCardClick);
  const newCard = newUserCard.renderCard();
  newElements.addItem(newCard);
  popupWithFormAdd.close();
})
popupWithFormAdd.setEventListeners();

const formValidationEdit = new FormValidator(elements, formEdit);
formValidationEdit.enableValidation();
const formValidationAdd = new FormValidator(elements, formAdd);
formValidationAdd.enableValidation();

buttonProfileEdit.addEventListener("click", () => handlePopupEdit(popupEdit));
buttonProfileAdd.addEventListener("click", () => handlePopupAdd(popupAdd));
