/** Validation schema.
 * @module validators/userRegisterSchema
 */

/**
 * Schema with validations related to register.
 * @type { object }
 * @const
 * @namespace userRegisterSchema
 */
const userRegisterSchema = {
  /**
   * Validates the username.
   * @author Mayya Markova
   * @name validateUsername
   * @function
   * @memberof module:validators/userRegisterSchema~userRegisterSchema
   * @inner
   * @param { string } value The value to check.
   * @returns { string|null } Null or an error message.
   */
  username: (value) => {
    if (!value) {
      return 'Username is required!';
    }

    if (typeof value !== 'string' || value.length < 3 || value.length > 25) {
      return 'Username should be a string in range [3..25]!';
    }

    return null;
  },
  /**
   * Validates the password.
   * @author Mayya Markova
   * @name validatePassword
   * @memberof module:validators/userRegisterSchema~userRegisterSchema
   * @function
   * @memberof userRegisterSchema
   * @inner
   * @param { string } value The value to check.
   * @returns { string|null } Null or an error message.
   */
  password: (value) => {
    if (!value) {
      return 'Password is required!';
    }

    if (typeof value !== 'string' || value.length < 3 || value.length > 25) {
      return 'Password should be a string in range [3..25]!';
    }

    return null;
  },
  /**
   * Validates the first name.
   * @author Mayya Markova
   * @name validateFirstName
   * @memberof module:validators/userRegisterSchema~userRegisterSchema
   * @function
   * @memberof userRegisterSchema
   * @inner
   * @param { string } value The value to check.
   * @returns { string|null } Null or an error message.
   */
  firstName: (value) => {
    if (!value) {
      return 'First name is required!';
    }

    if (typeof value !== 'string' || value.length < 2 || value.length > 25) {
      return 'First name should be a string in range [2..25]!';
    }

    return null;
  },
  /**
   * Validates the last name.
   * @author Mayya Markova
   * @name validateLastName
   * @memberof module:validators/userRegisterSchema~userRegisterSchema
   * @function
   * @memberof userRegisterSchema
   * @inner
   * @param { string } value The value to check.
   * @returns { string|null } Null or an error message.
   */
  lastName: (value) => {
    if (!value) {
      return 'Last name is required!';
    }

    if (typeof value !== 'string' || value.length < 2 || value.length > 25) {
      return 'Last name should be a string in range [2..25]!';
    }

    return null;
  },
  /**
   * Validates the avatar.
   * @author Mayya Markova
   * @name validateAvatar
   * @memberof module:validators/userRegisterSchema~userRegisterSchema
   * @function
   * @memberof userRegisterSchema
   * @inner
   * @param { string } value The value to check.
   * @returns { string|null } Null or an error message.
   */
  avatar: (value) => {
    if (!value) {
      return 'Avatar is required!';
    }

    return null;
  },
};


export default userRegisterSchema;