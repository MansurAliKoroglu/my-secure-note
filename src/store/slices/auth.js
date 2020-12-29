import { createSlice } from '@reduxjs/toolkit';

import api from '../../api';
import helpers from './auth/helpers';

const signUp = (email, password, history) => {
  return async dispatch => {
    dispatch(authSlice.actions.setIsSigningIn(true));
    dispatch(authSlice.actions.setError(null));

    try {
      const refreshToken = await api.auth.signUp(email, password);

      helpers.setAuthCookies(refreshToken);

      dispatch(authSlice.actions.setIsAuthenticatedTrue());

      history.push('/');
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          dispatch(authSlice.actions.setError('This email is already in use!'));
          break;
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
      const refreshToken = await api.auth.signIn(email, password);

      helpers.setAuthCookies(refreshToken);

      dispatch(authSlice.actions.setIsAuthenticatedTrue());

      history.push('/');
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          dispatch(authSlice.actions.setError('Email not found!'));
          break;
        case 'auth/wrong-password':
          dispatch(authSlice.actions.setError('Invalid Password!'));
          break;
        case 'auth/user-disabled':
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
    isAuthenticated: false
  },
  reducers: {
    /*completeInitialize(state) {
      state.isInitializing = false;
    },*/
    setIsSigningIn(state, action) {
      state.isSigningIn = action.payload;
    },
    setError(state, action) {
      state.errorMessage = action.payload;
    },
    setIsAuthenticatedTrue(state) {
      state.isAuthenticated = true;
    }
  }
});

export default authSlice.reducer;

export { /*initialize,*/ signUp, signIn };
