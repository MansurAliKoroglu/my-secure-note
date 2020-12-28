import axios from 'axios';

import key from '../key';

const signIn = async (email, password) => {
  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
    {
      email,
      password,
      returnSecureToken: true
    }
  );
};

export default signIn;
