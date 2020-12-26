import axios from 'axios';

export const signIn = async (email, password) => {
  return await axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKTYgjtDgcF2k_1aFZtRCAwz88N3W6PGg',
    {
      email,
      password,
      returnSecureToken: true
    }
  );
};

export const refresh = async refreshToken => {
  return await axios.post(
    'https://securetoken.googleapis.com/v1/token?key=AIzaSyAKTYgjtDgcF2k_1aFZtRCAwz88N3W6PGg',
    {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }
  );
};
