import serviceErrors from './service-errors.js';
import bcrypt from 'bcrypt';

const registerUser = (usersData) => {
  return async (registrationData) => {
    const { username, password, firstName, lastName, avatar } =  registrationData;

    const exsistingUser = await usersData.getByUsername(username);
    if (exsistingUser) {
      return {
        user: null,
        userError: serviceErrors.DUPLICATE_RESOURCE,
      };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await usersData.createUser(username, passwordHash, firstName, lastName, avatar);

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

/**
 * Returns a function, which gets top students.
 * @author Mayya Markova
 * @param { object } usersData An object with data-layer functions.
 * @return { function } A function, which accepts search parameters and returns the matching users.
 */
const getTopStudents = (usersData) => {
  /**
   * Gets users, matching the search.
   * @author Mayya Markova
   * @async
   * @function getTopStudentsInnerFunction
   * @param { number|undefined } page Search parameter: the page number.
   * @param { number|undefined } limit Search parameter: the number of quizes per page.
   * @param { string|undefined } username Search parameter: a users's username.
   * @returns { Promise<object> } The matching users and if the page parameter
   * is defined- page information.
   */
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