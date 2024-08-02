// src/services/authService.js

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL; // this is our Express API url

const signup = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    if (json.token) {
        localStorage.setItem('token', json.token)
        const user = JSON.parse(atob(json.token.split('.')[1]))
        return user
    }
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const signin = async (formData) => {
    try {
      const res = await fetch(`${BACKEND_URL}/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.error) {
        throw new Error(json.error);
      }
      if (json.token) {
        localStorage.setItem('token', json.token)
        const user = JSON.parse(atob(json.token.split('.')[1]))
        return user
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

const getUser = () => {
    const token = localStorage.getItem('token')
    if (!token) return null 
        const user = JSON.parse(atob(token.split('.')[1]))
        return user
}

const signout = () => {
    localStorage.removeItem('token')
}

export {
  signup,
  signin,
  getUser,
  signout
};