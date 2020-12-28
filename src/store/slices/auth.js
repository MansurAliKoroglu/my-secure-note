import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

import api from '../../api';
import helpers from './auth/helpers';

const refresh = () => {
  return async dispatch => {
    const cookies = new Cookies();
    const refreshToken = cookies.get('refreshToken');

    if (!refreshToken) {
      return;
    }

    try {
      const response = await api.auth.refresh(refreshToken);

      helpers.setAuthCookies(response.data.id_token, response.data.refresh_token, response.data.expires_in);

      dispatch(authSlice.actions.setAuthInfo({
        isAuthenticated: true,
        idToken: response.data.id_token,
        refreshToken: response.data.refresh_token,
        expiresIn: response.data.expires_in,
      }));

      setTimeout(() => {
        dispatch(refresh());
      }, response.data.expires_in * 1000 - 20000);
    } catch (error) {
      const errorMessage = error.response.data.error.message;

      if (
        errorMessage === 'TOKEN_EXPIRED' ||
        errorMessage === 'USER_DISABLED' ||
        errorMessage === 'USER_NOT_FOUND'
      ) {
        cookies.remove('idToken');
        cookies.remove('refreshToken');
        cookies.remove('expiresIn');
      }
    }
  };
};

const initialize = () => {
  return async dispatch => {
    const cookies = new Cookies();
    const refreshToken = cookies.get('refreshToken');

    if (!refreshToken) {
      return;
    }

    try {
      const response = await api.auth.refresh(refreshToken);

      helpers.setAuthCookies(response.data.id_token, response.data.refresh_token, response.data.expires_in);

      dispatch(authSlice.actions.setAuthInfo({
        isAuthenticated: true,
        idToken: response.data.id_token,
        refreshToken: response.data.refresh_token,
        expiresIn: response.data.expires_in,
      }));

      dispatch(authSlice.actions.completeInitialize());

      setTimeout(() => {
        dispatch(refresh());
      }, response.data.expires_in * 1000 - 20000);
    } catch (error) {
      const errorMessage = error.response.data.error.message;

      if (
        errorMessage === 'TOKEN_EXPIRED' ||
        errorMessage === 'USER_DISABLED' ||
        errorMessage === 'USER_NOT_FOUND'
      ) {
        cookies.remove('idToken');
        cookies.remove('refreshToken');
        cookies.remove('expiresIn');
      }
    }
  };
};

const signUp = (email, password, history) => {
  return async dispatch => {
    dispatch(authSlice.actions.setIsSigningIn(true));
    dispatch(authSlice.actions.setError(null));

    try {
      const response = await api.auth.signUp(email, password);

      helpers.setAuthCookies(response.data.idToken, response.data.refreshToken, response.data.expiresIn);

      dispatch(authSlice.actions.setAuthInfo({
        isAuthenticated: true,
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
        isAuthenticated: true,
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
    isInitializing: true,
    isSigningIn: false,
    errorMessage: null,
    idToken: null,
    isAuthenticated: false,
    refreshToken: null,
    expiresIn: null
  },
  reducers: {
    completeInitialize(state) {
      state.isInitializing = false;
    },
    setIsSigningIn(state, action) {
      state.isSigningIn = action.payload;
    },
    setError(state, action) {
      state.errorMessage = action.payload;
    },
    setAuthInfo(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.idToken = action.payload.idToken;
      state.refreshToken = action.payload.refreshToken;
      state.expiresIn = action.payload.expiresIn;
    }
  }
});

export default authSlice.reducer;

export { initialize, signUp, signIn };
