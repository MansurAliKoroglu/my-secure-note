import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

import * as authApi from '../../api/auth';

const signIn = (email, password, history) => {
  return async dispatch => {
    dispatch(authSlice.actions.setIsSigningIn(true));
    dispatch(authSlice.actions.setError(null));

    let response;
    let errorMessage;

    try {
      response = await authApi.signIn(email, password);
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
      const cookies = new Cookies();
      cookies.set(
        'idToken',
        response.data.idToken,
        {
          secure: true
        }
      );
      cookies.set(
        'refreshToken',
        response.data.refreshToken,
        {
          secure: true
        }
      );
      cookies.set(
        'expiresIn',
        response.data.expiresIn
      );

      dispatch(authSlice.actions.setAuthInfo({
        idToken: response.data.idToken,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
      }));

      history.push('/');
    }

    dispatch(authSlice.actions.setIsSigningIn(false));
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isSigningIn: false,
    errorMessage: null,
    idToken: null,
    refreshToken: null,
    expiresIn: null
  },
  reducers: {
    setIsSigningIn(state, action) {
      state.isSigningIn = action.payload;
    },
    setError(state, action) {
      state.errorMessage = action.payload;
    },
    setAuthInfo(state, action) {
      state.idToken = action.payload.idToken;
      state.refreshToken = action.payload.refreshToken;
      state.expiresIn = action.payload.expiresIn;
    }
  }
});

export default authSlice.reducer;

export { signIn };
