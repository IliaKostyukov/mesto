export class UserInfo {
  constructor({ nameSelector, infoSelector }, avatarSelector) {
    this._username = document.querySelector(nameSelector);
    this._about = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  setUserInfo(data) {
    this._username.textContent = data.name;
    this._about.textContent = data.about;
  }

  setUserAvatar(image) {
    this._avatar.style.backgroundImage = `url(${image})`;
  }
}
