/** Validation schema.
 * @module validators/userLogInSchema
 */

/**
 * Schema with validations related to login.
 * @type { object }
 * @const
 * @namespace userLogInSchema
 */
const userLogInSchema = {
  /**
   * Validates the username.
   * @author Mayya Markova
   * @name validateUsername
   * @function
   * @memberof module:validators/userLogInSchema~userLogInSchema
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
   * @function
   * @memberof module:validators/userLogInSchema~userLogInSchema
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
};

export default userLogInSchema;