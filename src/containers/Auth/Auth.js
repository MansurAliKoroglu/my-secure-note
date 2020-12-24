import classes from './Auth.module.css';

import TextField from '../../components/TextField/TextField';

const Auth = () => {
  return (
    <div className={classes.Auth}>
      <div className={classes.Form}>
        <h1>MSN</h1>
        <TextField
          className={classes.Input}
          placeholder="Email"
          type="email"
          autoFocus
        />
        <TextField
          className={classes.Input}
          placeholder="Password"
          type="password"
        />
        <button className={classes.LoginButton}>SIGN IN</button>
      </div>
    </div>
  );
};

export default Auth;
