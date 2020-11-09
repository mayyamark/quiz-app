import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import './LoginForm.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 400,
    },
  },
}));

const RegisterForm = (props) => {
  const { login } = props;
  const classes = useStyles();

  const [isFormValid, setIsFormValid] = useState(false);
  const [form, setForm] = useState({
    username: {
      value: '',
      validations: {
        required: true,
        minLength: 3,
        maxLength: 25,
      },
      valid: false,
      touched: false,
    },
    password: {
      value: '',
      validations: {
        required: true,
        minLength: 4,
      },
      valid: false,
      touched: false,
    },
  });

  const sendLoginData = (ev) => {
    ev.preventDefault();

    const loginData = Object.keys(form).reduce((acc, key) => {
        return {
          ...acc,
          [key]: form[key].value,
        };
    }, {});

    login(loginData);
  };

  const isInputValid = (input, validations) => {
    let isValid = true;

    if (validations.required) {
      isValid = isValid && input.length !== 0;
    }
    if (validations.minLength) {
      isValid = isValid && input.length >= validations.minLength;
    }
    if (validations.maxLength) {
      isValid = isValid && input.length <= validations.maxLength;
    }

    return isValid;
  };

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;

    const updatedElement = { ...form[name] };
    updatedElement.value = value;
    updatedElement.touched = true;
    updatedElement.valid = isInputValid(value, updatedElement.validations);

    const updatedForm = { ...form, [name]: updatedElement };
    setForm(updatedForm);

    const checkIfFormIsValid = Object.values(updatedForm).every(
      (el) => el.valid,
    );

    setIsFormValid(checkIfFormIsValid);
  };


  return (
    <>
    <CssBaseline />
    <Container id="login-form" maxWidth="sm">
    <form className={classes.root} noValidate onSubmit={sendLoginData} autoComplete="off">
      <div>
        <TextField
          className="outlined-basic"
          label="Username"
          name="username"
          value={form.username.value}
          onChange={handleInputChange}
          placeholder="Enter username"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          className="outlined-basic"
          label="Password"
          name="password"
          value={form.password.value}
          onChange={handleInputChange}
          placeholder="Enter password"
          type="password"
          variant="outlined"
        />
      </div>
      <Button 
        variant="contained" 
        type="submit"
        disabled={!isFormValid} 
        size="large" 
        color="primary"
        id="login-btn"
      >
        LOG IN
      </Button>
    </form>
    </Container>
    </>
  );

};

export default RegisterForm;
