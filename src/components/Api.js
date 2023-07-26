export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._authorization = headers.authorization;
    this._contentType = headers["Content-Type"];
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error ${res.status}`);
    });
  }

  getProfileData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error ${res.status}`);
    });
  }

  setProfileInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name: data["profile-name"],
        about: data["profile-about"],
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error ${res.status}`);
    });
  }

  setProfileAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error ${res.status}`);
    });
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name: data["card-name"],
        link: data["card-url"],
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error ${res.status}`);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error ${res.status}`);
    });
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error ${res.status}`);
    });
  }

  removeLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error ${res.status}`);
    });
  }
}
