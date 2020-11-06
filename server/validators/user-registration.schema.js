const userRegisterSchema = {
  username: (value) => {
    if (!value) {
      return 'Username is required!';
    }

    if (typeof value !== 'string' || value.length < 3 || value.length > 25) {
      return 'Username should be a string in range [3..25]!';
    }

    return null;
  },
  password: (value) => {
    if (!value) {
      return 'Password is required!';
    }

    if (typeof value !== 'string' || value.length < 3 || value.length > 25) {
      return 'Password should be a string in range [3..25]!';
    }

    return null;
  },
  firstName: (value) => {
    if (!value) {
      return 'First name is required!';
    }

    if (typeof value !== 'string' || value.length < 3 || value.length > 25) {
      return 'First name should be a string in range [3..25]!';
    }

    return null;
  },
  lastName: (value) => {
    if (!value) {
      return 'Last name is required!';
    }

    if (typeof value !== 'string' || value.length < 3 || value.length > 25) {
      return 'Last name should be a string in range [3..25]!';
    }

    return null;
  },
  role: (value) => {
    if (!value) {
      return 'Role is required!';
    }
    
    if (value !== 'student' && value !== 'teacher') {
      return 'Role should be a student or a teacher!';
    }

    return null;
  },
};


export default userRegisterSchema;