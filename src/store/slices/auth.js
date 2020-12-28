import { createSlice } from '@reduxjs/toolkit';

import api from '../../api';
import helpers from './auth/helpers';

const signUp = (email, password, history) => {
  return async dispatch => {
    dispatch(authSlice.actions.setIsSigningIn(true));
    dispatch(authSlice.actions.setError(null));

    try {
      const response = await api.auth.signUp(email, password);

      helpers.setAuthCookies(response.data.idToken, response.data.refreshToken, response.data.expiresIn);

      dispatch(authSlice.actions.setAuthInfo({
        idToken: response.data.idToken,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
      }));

      history.push('/');
    } catch (error) {
      switch (error.response.data.error.message) {
        case 'EMAIL_EXISTS':
          dispatch(authSlice.actions.setError('This email already in use!'));
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          dispatch(authSlice.actions.setError('Too many signup attempt. Please try again later.'));
          break
        default:
          dispatch(authSlice.actions.setError('Unexpected error occured. Please try again.'));
          break;
      }
    }

    dispatch(authSlice.actions.setIsSigningIn(false));
  }
};

const signIn = (email, password, history) => {
  return async dispatch => {
    dispatch(authSlice.actions.setIsSigningIn(true));
    dispatch(authSlice.actions.setError(null));

    try {
      const response = await api.auth.signIn(email, password);

      helpers.setAuthCookies(response.data.idToken, response.data.refreshToken, response.data.expiresIn);

      dispatch(authSlice.actions.setAuthInfo({
        idToken: response.data.idToken,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
      }));

      history.push('/');
    } catch (error) {
      switch (error.response.data.error.message) {
        case 'EMAIL_NOT_FOUND':
          dispatch(authSlice.actions.setError('Email not found!'));
          break;
        case 'INVALID_PASSWORD':
          dispatch(authSlice.actions.setError('Invalid Password!'));
          break;
        case 'USER_DISABLED':
          dispatch(authSlice.actions.setError('Your account has been blocked by an admin.'));
          break;
        default:
          dispatch(authSlice.actions.setError('Unexpected error occured. Please try again.'));
          break;
      }
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

export { signUp, signIn };
