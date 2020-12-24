import { useState } from 'react';

import classes from './Auth.module.css';

import TextField from '../../components/TextField/TextField';

const Auth = () => {
  const [emailState, setEmailState] = useState('');
  const [passwordState, setPasswordState] = useState('');

  const emailChangeHandler = event => {
    setEmailState(event.target.value);
  };

  const passwordChangeHandler = event => {
    setPasswordState(event.target.value);
  };

  return (
    <div className={classes.Auth}>
      <div className={classes.Form}>
        <h1>MSN</h1>
        <TextField
          className={classes.Input}
          placeholder="Email"
          type="email"
          autoFocus
          value={emailState}
          onChange={emailChangeHandler}
        />
        <TextField
          className={classes.Input}
          placeholder="Password"
          type="password"
          value={passwordState}
          onChange={passwordChangeHandler}
        />
        <button
          className={classes.LoginButton}
        >
          SIGN IN
        </button>
      </div>
    </div>
  );
};

export default Auth;
