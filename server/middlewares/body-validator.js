const bodyValidator = (schema) => {
  return (req, res, next) => {
    const body = req.body;
    const validations = Object.keys(schema);

    const fails = validations
      .map((validation) => schema[validation](body[validation]))
      .filter((result) => result !== null);

    if (fails.length > 0) {
      res.status(400).send(fails);
    } else {
      next();
    }
  };
};

export default bodyValidator;
