import serviceErrors from './errors-service.js';
import bcrypt from 'bcrypt';

const registerUser = (usersData) => {
  return async (registrationData) => {
    const { username, password, firstName, lastName, role } =  registrationData;

    const exsistingUser = await usersData.getByUsername(username);
    if (exsistingUser) {
      return {
        user: null,
        userError: serviceErrors.DUPLICATE_RESOURCE,
      };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await usersData.createUser(username, passwordHash, firstName, lastName, role);
    
    return { user, userError: null };
  };
};

const getLoggedUser = (usersData) => {
  return async (logInData) => {
    const { username, password } =  logInData;

    const user = await usersData.getByUsername(username);

    if (!user) {
      return {
        user: null,
        userError: serviceErrors.RESOURCE_NOT_FOUND,
      };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return {
        user: null,
        userError: serviceErrors.BAD_REQUEST,
      };
    }
    
    return { user, userError: null };

  };
};

const logOutUser = (blacklistData) => {
  return async (token) => {
    const isTokenBlacklisted = await blacklistData.isTokenBlacklisted(token);

    if (isTokenBlacklisted) {
      return { tokenError: serviceErrors.UNAUTHORIZED };
    }
    
    const _ = await blacklistData.blacklistToken(token);

    return { tokenError: null };
  };
};

export default {
  registerUser,
  getLoggedUser,
  logOutUser,
};