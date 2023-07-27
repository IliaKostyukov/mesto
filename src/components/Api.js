export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}/${endpoint}`, options).then(this._checkResponse);
  }

  getInitialCards() {
    return this._request('cards', {
      headers: this._headers
    })
  }

  getProfileData() {
    return this._request('users/me', {
      headers: this._headers
    });
  }

  setProfileInfo(data) {
    return this._request('users/me', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data["profile-name"],
        about: data["profile-about"],
      })
    })
  }

  setProfileAvatar(avatar) {
    return this._request('users/me/avatar', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
  }

  addNewCard(data) {
    return this._request('cards', {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data["card-name"],
        link: data["card-url"],
      })
    })
  }

  deleteCard(cardId) {
    return this._request(`cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
  }

  addLike(id) {
    return this._request(`cards/${id}/likes`,{
      method: "PUT",
      headers: this._headers
    })
  }

  removeLike(id) {
    return this._request(`cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers
    })
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error ${res.status}`);
  }
}
