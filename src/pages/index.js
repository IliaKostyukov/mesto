import { Api } from "../components/Api.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupConfirm } from "../components/PopupConfirm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import "../pages/index.css";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  selectorData,
  buttonProfileEdit,
  buttonProfileAdd,
  buttonAvatarEdit,
  popupConfirmSelector,
  popupAvatarSelector,
  popupEditSelector,
  popupAddSelector,
  popupFigureSelector,
  avatarSelector,
  formEdit,
  formAdd,
  formAvatar,
  options,
  formEditInputSelectors,
  cardsContainerSelector,
  templateSelector,
} from "../utils/const.js";

const api = new Api(options);

const userInfo = new UserInfo(formEditInputSelectors, avatarSelector);

const cardsList = new Section(
  {
    renderer: (data) => {
      const newCard = generateNewCard(data, userId, templateSelector, {
        handleFigureCard: () => {
          popupFigure.open(data.link, data.name)
        },

        handleDeleteCard: (element, cardId) => {
          popupConfirm.open(element, cardId);
        },

        handleLike: () => {
          if (newCard.isLiked()) {
            api.removeLike(data._id).then((res) => {
              newCard.removeLike(res.likes.length);
            });
          } else {
            api.addLike(data._id).then((res) => {
              newCard.addLike(res.likes.length);
            });
          }
        },
      });
      return newCard.renderCard();
    },
  },
  cardsContainerSelector
);

const createSubmitForm = (popupSelector, handlerSubmit) => {
  return new PopupWithForm(popupSelector, handlerSubmit);
};

const createFormValidation = (selectorData, form) => {
  return new FormValidator(selectorData, form);
};

const generateNewCard = (data, userId, templateSelector, func) => {
  return new Card(data, userId, templateSelector, func);
};

let userId = null;

// Render default page state

Promise.all([api.getProfileData(), api.getInitialCards()])
  .then(([profileData, initialCards]) => {
    userId = profileData._id;
    userInfo.setUserInfo(profileData);
    userInfo.setUserAvatar(profileData.avatar);
    cardsList.renderElements(initialCards);
  })
  .catch(console.error);

  //Popup Handler request function

  const handleSubmit = (request, popup, loadingText = 'Сохранение...') => {
    popup.renderLoading(true, loadingText);
    request().then(() => {
      popup.close();
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      popup.renderLoading(false);
    })
  }

// Edit popup

const popupWithFormEdit = createSubmitForm(popupEditSelector, (data) => {
  const request = () => {
    return api.setProfileInfo(data).then(userData => {
      userInfo.setUserInfo(userData)
    })
  }
  handleSubmit(request, popupWithFormEdit)
})

const handlePopupEdit = () => {
  const data = userInfo.getUserInfo();
  popupWithFormEdit.setInputValues({
    "profile-name": data.name,
    "profile-about": data.about,
  });
  formValidationEdit.checkInputValidity();
  formValidationEdit.toggleButtonDisabledState();
  popupWithFormEdit.open();
};

const formValidationEdit = createFormValidation(selectorData, formEdit);
formValidationEdit.enableValidation();

// Add popup

const popupWithFormAdd = createSubmitForm(popupAddSelector, (data) => {
  const request = () => {
    return api.addNewCard(data).then((card) => {
      cardsList.addItem(card)
    })
  }
  handleSubmit(request, popupWithFormAdd)
});

const handlePopupAdd = () => {
  formValidationAdd.resetError();
  formValidationAdd.toggleButtonDisabledState();
  popupWithFormAdd.open();
};

const formValidationAdd = createFormValidation(selectorData, formAdd);
formValidationAdd.enableValidation();

// Figure popup

const popupFigure = new PopupWithImage(popupFigureSelector);

// Confirm popup

const popupConfirm = new PopupConfirm(
  popupConfirmSelector,
  (elementToDelete, cardId) => {
    api
      .deleteCard(cardId)
      .then((res) => {
        elementToDelete.remove();
        elementToDelete = null;
        popupConfirm.close();
      })
      .catch(console.error);
  }
);

// Avatar popup

const avatar = new PopupWithForm(popupAvatarSelector, (data) => {
  avatar.renderLoading(true);
  api
    .setProfileAvatar(data["avatar-url"])
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      avatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatar.renderLoading(false);
    });
});

const handlePopupAvatar = () => {
  formValidationAvatar.resetError();
  formValidationAvatar.toggleButtonDisabledState();
  avatar.open();
};

const formValidationAvatar = createFormValidation(selectorData, formAvatar);
formValidationAvatar.enableValidation();

// Listeners

buttonProfileEdit.addEventListener("click", () => handlePopupEdit());
buttonProfileAdd.addEventListener("click", () => handlePopupAdd());
buttonAvatarEdit.addEventListener("click", () => handlePopupAvatar());
popupWithFormAdd.setEventListeners();
popupFigure.setEventListeners();
popupWithFormEdit.setEventListeners();
popupConfirm.setEventListeners();
avatar.setEventListeners();
