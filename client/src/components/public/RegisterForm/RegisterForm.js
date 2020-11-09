import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import randomAvatar from '../../../avatars/students/students-avatars.js';
import './RegisterForm.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 400,
    },
  },
}));

const RegisterForm = (props) => {
  const { register } = props;
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
    firstName: {
      value: '',
      validations: {
        required: true,
        minLength: 2,
        maxLength: 25,
      },
      valid: false,
      touched: false,
    },
    lastName: {
      value: '',
      validations: {
        required: true,
        minLength: 2,
        maxLength: 25,
      },
      valid: false,
      touched: false,
    },
  });

  const sendRegistrationData = (ev) => {
    ev.preventDefault();

    const registrationData = Object.keys(form).reduce((acc, key) => {
        return {
          ...acc,
          [key]: form[key].value,
        };
    }, {});

    registrationData.avatar = randomAvatar;

    register(registrationData);
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
    <Container id="register-form" maxWidth="sm">
    <form className={classes.root} noValidate onSubmit={sendRegistrationData} autoComplete="off">
      <div>
        <TextField
          error={form.username.touched && !form.username.valid}
          className="outlined-error-helper-text"
          label="Username"
          name="username"
          value={form.username.value}
          onChange={handleInputChange}
          placeholder="Enter username"
          variant="outlined"
          helperText={(form.username.touched && !form.username.valid) ? 'Should be between 3 and 25 symbols.' : '' }
        />
      </div>
      <div>
        <TextField
          error={form.password.touched && !form.password.valid}
          className="outlined-error-helper-text"
          label="Password"
          name="password"
          value={form.password.value}
          onChange={handleInputChange}
          placeholder="Enter password"
          type="password"
          helperText={(form.password.touched && !form.password.valid) ? 'Should be more than 4 symbols.' : '' }
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          error={form.firstName.touched && !form.firstName.valid}
          className="outlined-error-helper-text"
          label="First name"
          name="firstName"
          value={form.firstName.value}
          onChange={handleInputChange}
          placeholder="Enter first name"
          helperText={(form.firstName.touched && !form.firstName.valid) ? 'Required' : '' }
          variant="outlined"
        />
        <TextField
          error={form.lastName.touched && !form.lastName.valid}
          className="outlined-error-helper-text"
          label="Last name"
          name="lastName"
          value={form.lastName.value}
          onChange={handleInputChange}
          placeholder="Enter last name"
          helperText={(form.lastName.touched && !form.lastName.valid) ? 'Required' : '' }
          variant="outlined"
        />
      </div>
      <Button 
        variant="contained" 
        type="submit"
        disabled={!isFormValid} 
        size="large" 
        color="primary"
        id="register-btn"
      >
        REGISTER
      </Button>
    </form>
    </Container>
    </>
  );

};

export default RegisterForm;
