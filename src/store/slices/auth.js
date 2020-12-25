import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const signIn = (email, password) => {
  return async dispatch => {
    dispatch(authSlice.actions.setIsSigningIn(true));
    dispatch(authSlice.actions.setError(null));

    let errorMessage;

    try {
      await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKTYgjtDgcF2k_1aFZtRCAwz88N3W6PGg', {
        email,
        password,
        returnSecureToken: true
      });
    } catch (error) {
      errorMessage = error.response.data.error.message;
    }

    if (errorMessage) {
      if (errorMessage === 'EMAIL_NOT_FOUND') {
        dispatch(authSlice.actions.setError('Email not found!'));
      } else if (errorMessage === 'INVALID_PASSWORD') {
        dispatch(authSlice.actions.setError('Invalid Password!'));
      } else if (errorMessage === 'USER_DISABLED') {
        dispatch(authSlice.actions.setError('Your account has been blocked by an admin.'));
      } else {
        dispatch(authSlice.actions.setError('Unexpected error occured. Please try again.'));
      }
    } else {
      // TODO: Handle status 200 here.
    }

    dispatch(authSlice.actions.setIsSigningIn(false));
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isSigningIn: false,
    errorMessage: null
  },
  reducers: {
    setIsSigningIn(state, action) {
      state.isSigningIn = action.payload;
    },
    setError(state, action) {
      state.errorMessage = action.payload;
    }
  }
});

export default authSlice.reducer;

export { signIn };
