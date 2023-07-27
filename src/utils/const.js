export const selectorData = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
export const options = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-71",
  headers: {
    authorization: "53f9337b-53ae-49a9-bf9e-cfde23da9543",
    "Content-Type": "application/json",
  },
};
export const avatarSelector = '.profile__avatar';
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const buttonProfileEdit = document.querySelector(
  ".profile__edit-button"
);
export const buttonProfileAdd = document.querySelector(".profile__add-button");
export const buttonProfileConfirm = document.querySelector(
  ".profile__confirm-button"
);
export const buttonAvatarEdit = document.querySelector(".profile__avatar");
export const popupEditSelector = ".popup_type_edit";
export const popupAddSelector = ".popup_type_new-place";
export const popupConfirmSelector = ".popup_type_confirm";
export const popupAvatarSelector = ".popup_type_avatar";
export const popupFigureSelector = ".popup_type_figure";
export const formEdit = document.forms["profile-form"];
export const formAdd = document.forms["card-form"];
export const formAvatar = document.forms["avatar-form"];
export const formEditInputSelectors = {
  nameSelector: ".profile__title",
  infoSelector: ".profile__subtitle",
};
export const cardsContainerSelector = ".elements__list";
export const templateSelector = ".template";
