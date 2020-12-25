import { Formik, Form } from 'formik';
import * as yup from 'yup';

import classes from './Auth.module.css';

import TextField from '../../components/TextField/TextField';

const onSubmit = () => {
  // TODO: Submit will be handled here
};

const Auth = () => {
  const errorMessageArea = (formik, type) => {
    return (
      <div className={classes.ErrorMessageArea}>
        {formik.errors[type] && formik.touched[type] ? <p className={classes.ErrorMessage}>{formik.errors[type]}</p> : null}
      </div>
    );
  };

  return (
    <div className={classes.Auth}>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={
          yup.object({
            email: yup.string().email('Must be a valid email.'),
            password: yup.string().min(6, 'Password must be minimum 6 characters.')
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
                <button
                  type="submit"
                  className={classes.LoginButton}
                >
                  SIGN IN
              </button>
              </Form>
            )
          }
        }
      </Formik>
    </div>
  );
};

export default Auth;
