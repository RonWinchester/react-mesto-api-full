class Api {
  constructor({ adress, token, groupId }) {
    this._adress = adress;
    this._token = token;
    this._groupId = groupId
  }

  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`${res.status}`)
  }

  getUserInformation() {
    return fetch(`${this._adress}${this._groupId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        return this._getResponseData(res)
      })
  }

  patchUserInformation(data) {
    return fetch(`${this._adress}${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
      .then(res => {
        return this._getResponseData(res)
      })
  }

  getCards() {
    return fetch(`${this._adress}${this._groupId}/cards/`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        return this._getResponseData(res)
      })
  }

  postCard({ name, link }) {
    return fetch(`${this._adress}${this._groupId}/cards/`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        link: link,
        name: name
      })
    })
      .then(res => {
        return this._getResponseData(res)
      })
  }

  changeLikeCardStatus(id, isLiked) {
    const methodParametr = isLiked ? "DELETE" : "PUT";
    return fetch(`${this._adress}${this._groupId}/cards/likes/${id}`, {
      method: methodParametr,
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return this._getResponseData(res)
      })
  }

  putLikeCard(id) {
    return fetch(`${this._adress}${this._groupId}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return this._getResponseData(res)
      })
  }

  deleteLikeCard(id) {
    return fetch(`${this._adress}${this._groupId}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return this._getResponseData(res)
      })
  }

  deleteCards(id) {
    return fetch(`${this._adress}${this._groupId}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return this._getResponseData(res)
      })
  }

  pathcAvatar(avatarURL) {
    return fetch(`${this._adress}${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarURL,
      })
    })
      .then(res => {
        return this._getResponseData(res)
      })
  }
}

export default Api

export const api = new Api({
  adress: "https://mesto.nomoreparties.co/v1/",
  token: "30104c84-de4d-41a2-bc56-a72d831bec2a",
  groupId: 'cohort-24'
})

