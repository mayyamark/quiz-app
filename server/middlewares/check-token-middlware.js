import serviceErrors from '../services/service-errors.js';

const checkTokenMiddleware = (usersService) => (blacklistData) => async (req, res, next) => {
  const token =  req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(404).json({ message: 'No token in the request!' });
  }

  const { tokenError } = await usersService.isUserLoggedOut(blacklistData)(token);
  if (tokenError === serviceErrors.UNAUTHORIZED) {
    return res.status(403).json({ message: 'User is not logged in!' });
  }

  next();
};

export default checkTokenMiddleware;
