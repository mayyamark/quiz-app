const roleMiddleware = (roleName) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== roleName) {
      return res.status(403).send({ message: 'Resource is forbidden!' });
    }

    next();
  };
};

export default roleMiddleware;
