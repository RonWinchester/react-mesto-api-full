export const BASE_URL = "https://mestoapi.polugrudov.ru/";

function getResponseData(res) {
  return res.ok ? res.json() : Promise.reject(`${res.status}`);
}

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then((response) => {
    return getResponseData(response);
  });
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then((response) => {
    return getResponseData(response);
  });
};

export const logout = () => {
  return fetch(`${BASE_URL}logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return getResponseData(response);
  });
};

/* export const getContent = (token) => {
  return fetch(`${BASE_URL}users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      //'Authorization': `Bearer ${token}`,
    },
  }).then((response) => getResponseData(response));
}; */

export const getCookie = () => {
  return fetch(`${BASE_URL}check-cookie`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      //'Authorization': `Bearer ${token}`,
    },
  }).then((response) => getResponseData(response));
};
