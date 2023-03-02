import React, { useState } from 'react';
import useStyles from './styleauth';
import {
  Button,
  Avatar,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import GeneralInput from './GeneralInput';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const Auth = () => {
  const [formData, setFormData] = useState({
    firstName: ' ',
    lastName: ' ',
    email: ' ',
    password: ' ',
    confirmPassword: ' ',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const classes = useStyles();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setShowPassword(false);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {isSignUp ? 'Sign Up' : 'Sign In'} <br />
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <GeneralInput
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  autoFocus
                  half
                ></GeneralInput>
                <GeneralInput
                  name='lastName'
                  label='Last Name'
                  handleChange={handleChange}
                  autoFocus
                  half
                ></GeneralInput>
              </>
            )}
            {/* BOTH ARE COMMON */}
            <GeneralInput
              name='email'
              label='Email'
              handleChange={handleChange}
              type='email'
            ></GeneralInput>
            <GeneralInput
              name='password'
              label='Password'
              handleChange={handleChange}
              type={showPassword ? 'Text' : 'Password'}
              handleShowPassword={handleShowPassword}
            ></GeneralInput>
            {/* END COMMON */}

            {isSignUp && (
              <GeneralInput
                name='confirmPassword'
                label='Confirm Password'
                handleChange={handleChange}
                type='password'
              ></GeneralInput>
            )}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {isSignUp ? 'SignUp' : 'SignIn'}
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? 'Already Have An Account SignIn'
                  : "Don't Have An Account SignUp"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;