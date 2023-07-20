export class UserInfo {
  constructor({nameSelector, infoSelector}) {
    this._username = document.querySelector(nameSelector);
    this._about = document.querySelector(infoSelector);
  }

  getUserInfo() {
    const userInfo = {
      'name': this._username.textContent,
      'about': this._about.textContent
    }
    return userInfo
  }

  setUserInfo(data) {
    this._username.textContent = data['type_name'];
    this._about.textContent = data['type_info'];
  }
}
