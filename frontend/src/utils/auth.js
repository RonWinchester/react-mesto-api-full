export const BASE_URL = 'https://auth.nomoreparties.co/'

function getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`${res.status}`)
}

export const register = ({ email, password }) => {
    return fetch(`${BASE_URL}signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
        .then((response) => {
            return getResponseData(response)
        })
};

export const authorize = ({ email, password }) => {
    return fetch(`${BASE_URL}signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    }).then((response) => {
        return getResponseData(response)
    })
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(response => getResponseData(response))
}