import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { useHistory, Link } from 'react-router-dom';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import classes from './Auth.module.css';

import TextField from '../../components/TextField/TextField';
import { signUp, signIn } from '../../store/slices/auth';

const Auth = () => {
  const [isAuthModeSignInState, setIsAuthModeSignInState] = useState(true);

  const errorMessage = useSelector(state => state.auth.errorMessage);
  const isSigningIn = useSelector(state => state.auth.isSigningIn);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.replace('/');
    }

    if (history.location.pathname === '/auth') {
      history.replace('/auth/sign-in');
    }

    if (history.location.pathname === '/auth/sign-in') {
      setIsAuthModeSignInState(true)
    } else {
      setIsAuthModeSignInState(false);
    }
  }, [isAuthenticated, history]);

  const onSubmit = values => {
    if (isAuthModeSignInState) {
      dispatch(signIn(values.email, values.password, history));
    } else {
      dispatch(signUp(values.email, values.password, history));
    }
  };

  const errorMessageArea = (formik, type) => {
    return (
      <div className={classes.ErrorMessageArea}>
        {formik.errors[type] && formik.touched[type] ? <p className={classes.ErrorMessage}>{formik.errors[type]}</p> : null}
      </div>
    );
  };

  let signInButton;

  if (!isSigningIn) {
    signInButton =
      <button
        type="submit"
        className={classes.LoginButton}
      >
        {isAuthModeSignInState ? 'SIGN IN' : 'SIGN UP'}
      </button>;
  } else {
    signInButton =
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={50}
      />;
  }

  if (!isAuthenticated) {
    return (
      <div className={classes.Auth}>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={
            yup.object({
              email: yup.string().required('Email is required').email('Must be a valid email.'),
              password: yup.string().required('Password is required').min(6, 'Password must be minimum 6 characters.')
            })
          }
          onSubmit={onSubmit}
          className={classes.Form}
        >
          {
            formik => {
              return (
                <Form className={classes.Form} noValidate>
                  <h1>MSN</h1>
                  <TextField
                    placeholder="Email"
                    type="email"
                    autoFocus
                    {...formik.getFieldProps('email')}
                  />
                  {errorMessageArea(formik, 'email')}
                  <TextField
                    placeholder="Password"
                    type="password"
                    {...formik.getFieldProps('password')}
                  />
                  {errorMessageArea(formik, 'password')}
                  {signInButton}
                  <div className={classes.ServerErrorMessageArea}>
                    <p>
                      {errorMessage}
                    </p>
                  </div>
                  <Link onClick={() => {
                    setIsAuthModeSignInState(!isAuthModeSignInState);
                  }} to={`/auth/${isAuthModeSignInState ? 'sign-up' : 'sign-in'}`}>{isAuthModeSignInState ? 'Sign up now' : 'Sign in'}</Link>
                </Form>
              )
            }
          }
        </Formik>
      </div>
    );
  } else {
    return null;
  }
};

export default Auth;
