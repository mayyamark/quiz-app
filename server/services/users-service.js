import serviceErrors from './service-errors.js';
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

const getTopStudents = (usersData) => {
  return async (page, limit, username) => {
    if (page || username) {
      const settedLimit = limit ? limit : 10;
      const offset = (page - 1) * settedLimit;

      const allSearchedStudents = await usersData.searchBy(username);
  
      if (page) {
        const studentsOnPage = await usersData.searchByWithPages(username, offset, settedLimit);
    
        return {
          students: studentsOnPage,
          currentPage: page,
          studentsCount: allSearchedStudents.length,
          hasNextPage: offset + settedLimit < allSearchedStudents.length,
          hasPreviousPage: page > 1,
        };
      } else {
        return {
          history: allSearchedStudents,
          historyCount: allSearchedStudents.length,
        };
      }
    }
  };
};

export default {
  registerUser,
  getLoggedUser,
  logOutUser,
  isUserLoggedOut,
  getTopStudents,
};