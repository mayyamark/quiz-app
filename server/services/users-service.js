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

export default {
  registerUser,
};