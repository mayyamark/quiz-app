import serviceErrors from './errors-service.js';
import bcrypt from 'bcrypt';

const registerUser = (usersData) => {
  return async (registrationData) => {
    const { username, password, firstName, lastName } =  registrationData;

    const exsistingUser = await usersData.getByUsername(username);
    if (exsistingUser) {
      return {
        user: null,
        userError: serviceErrors.DUPLICATE_RESOURCE,
      };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await usersData.createUser(username, passwordHash, firstName, lastName);
    
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

const isUserLoggedOut = (blacklistData) => {
  return async (token) => {
    const isTokenBlacklisted = await blacklistData.isTokenBlacklisted(token);

    if (isTokenBlacklisted) {
      return { isTokenBlacklisted, tokenError: serviceErrors.UNAUTHORIZED };
    }
    
    return { isTokenBlacklisted, tokenError: null };
  };
};

const getUserById = (usersData) => {
  return async (userID) => {
    const user = await usersData.getById(userID);

    if (!user) {
      return {
        user: null,
        userError: serviceErrors.RESOURCE_NOT_FOUND,
      };
    }

    return {
      user,
      userError: null,
    };
  };
};

export default {
  registerUser,
  getLoggedUser,
  logOutUser,
  isUserLoggedOut,
  getUserById,
};