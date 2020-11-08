import {schemaValidator} from '../validators/schema-validator.js';

const bodyValidator = (schema) => {
  return (req, res, next) => {
    const body = req.body;
    const fails = schemaValidator(schema, body);

    if (fails) {
      res.status(400).send(fails);
    } else {
      next();
    }
  };
};

export default bodyValidator;
