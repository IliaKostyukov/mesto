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
  nameInput,
  jobInput,
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
      const newCard = generateNewCard(
        data,
        templateSelector,
        handleCardClick,
        handleDeleteClick,
        likeHandler,
        userId
      );
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

const generateNewCard = (
  data,
  templateSelector,
  handleCardClick,
  handleDeleteClick,
  likeHandler,
  userId
) => {
  return new Card(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    likeHandler,
    userId
  );
};

let userId = null;

// Render default page state

Promise.all([api.getProfileData(), api.getInitialCards()]).then(
  ([profileData, initialCards]) => {
    userId = profileData._id;
    userInfo.setUserInfo(profileData);
    userInfo.setUserAvatar(profileData.avatar);
    cardsList.renderElements(initialCards);
  }
);

// Handle like

const likeHandler = {
  addLike: (button, counter, id) => {
    button.classList.add("element__like-button_active");
    api
      .addLike(id)
      .then((res) => {
        counter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  removeLike: (button, counter, id) => {
    button.classList.remove("element__like-button_active");
    api
      .removeLike(id)
      .then((res) => {
        counter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

// Edit popup

const popupWithFormEdit = createSubmitForm(popupEditSelector, (data) => {
  popupWithFormEdit.renderLoading(true);
  api
    .setProfileInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupWithFormEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormEdit.renderLoading(false);
    });
});

const handlePopupEdit = () => {
  api
    .getProfileData()
    .then((res) => {
      nameInput.value = res.name;
      jobInput.value = res.about;
      formValidationEdit.checkInputValidity();
      formValidationEdit.toggleButtonDisabledState();
      popupWithFormEdit.open();
    })
    .catch((err) => {
      console.log(err);
    });
};

const formValidationEdit = createFormValidation(selectorData, formEdit);
formValidationEdit.enableValidation();

// Add popup

const popupWithFormAdd = createSubmitForm(popupAddSelector, (data) => {
  popupWithFormAdd.renderLoading(true);
  api
    .addNewCard(data)
    .then((data) => {
      const newUserCard = generateNewCard(
        data,
        templateSelector,
        handleCardClick,
        handleDeleteClick,
        likeHandler,
        userId
      );
      const card = newUserCard.renderCard();
      cardsList.addItem(card);
      popupWithFormAdd.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormAdd.renderLoading(false);
    });
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

const handleCardClick = (image, link, name) => {
  image.addEventListener("click", () => {
    popupFigure.open(link, name);
  });
};

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
      .catch((err) => {
        console.log(err);
      });
  }
);

const handleDeleteClick = (deleteButton, elementToDelete, cardId) => {
  deleteButton.addEventListener("click", () => {
    popupConfirm.open(elementToDelete, cardId);
  });
};

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
