export class UserInfo {
  constructor({ nameSelector, infoSelector }, avatarSelector) {
    this._username = document.querySelector(nameSelector);
    this._about = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo = () => {
    return {
      name: this._username.textContent,
      about: this._about.textContent,
    };
  };

  setUserInfo({name , about}) {
    this._username.textContent = name;
    this._about.textContent = about;
  }

  setUserAvatar(image) {
    this._avatar.style.backgroundImage = `url(${image})`;
  }
}
