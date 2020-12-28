import axios from 'axios';

import key from '../key';

const signUp = async (email, password) => {
  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,
    {
      email,
      password,
      returnSecureToken: true
    }
  );
};

export default signUp;
