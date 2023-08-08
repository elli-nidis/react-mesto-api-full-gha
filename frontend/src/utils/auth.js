// export const BASE_URL = 'https://auth.nomoreparties.co/';
export const BASE_URL = 'http://localhost:4000/';

export const register = (email, password) => {
  return fetch(`${BASE_URL}signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify({password, email})
  })
  .then (response => {
    try {
      if (response.status === 201) {
        return response.json();
      }
    } 
    catch(err) {
        return (err);
      }
  })
  .then (res => {return res})
  .catch(e => console.log(e));
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify({password, email})
    // body: JSON.stringify({email, password})
  })
  .then (response => {
    try {
      if (response.status === 200) {
        return response.json();
      }
    } 
    catch(err) {
        return (err);
      }
  })
}

// export const getCurrentUser = (token) => {
export const getCurrentUser = () => {
  return fetch(`${BASE_URL}users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      // "Authorization" : `Bearer ${token}`
    },
    credentials: 'include'
  })
    .then(res => res.json())
    .then(data => data)
}





