class Api {
  constructor({ adress, token, groupId }) {
    this._adress = adress;
    //this._token = token;
    //this._groupId = groupId
  }

  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`${res.status}`);
  }

  getUserInformation() {
    return fetch(`${this._adress}users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  patchUserInformation(data) {
    return fetch(`${this._adress}users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getCards() {
    return fetch(`${this._adress}cards/`, {
      method: "GET",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  postCard({ name, link }) {
    return fetch(`${this._adress}cards/`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link: link,
        name: name,
      }),
    }).then((res) => {
      console.log(res)
      return this._getResponseData(res);
    });
  }

  changeLikeCardStatus(id, isLiked) {
    const methodParametr = isLiked ? "DELETE" : "PUT";
    return fetch(`${this._adress}cards/${id}/likes`, {
      method: methodParametr,
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  putLikeCard(id) {
    return fetch(`${this._adress}cards/${id}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteLikeCard(id) {
    return fetch(`${this._adress}cards/${id}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteCards(id) {
    return fetch(`${this._adress}cards/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  pathcAvatar(avatarURL) {
    return fetch(`${this._adress}users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarURL,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

export default Api;

export const api = new Api({
  adress: "https://api.polugrudov.students.nomoredomains.club/",
  //token: "30104c84-de4d-41a2-bc56-a72d831bec2a",
  //groupId: 'cohort-24'
});
