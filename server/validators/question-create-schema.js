import { schemaValidator } from './schema-validator.js';
import answerCreateSchema from './answer-create-schema.js';

const questionCreateSchema = {
  text: (value) => {
    if (!value) {
      return 'Question text is required!';
    }

    if (typeof value !== 'string' || value.length < 1 || value.length > 250) {
      return 'Question text name should be a string in range [1..250]!';
    }

    return null;
  },
  points: (value) => {
    if (!value) {
      return 'Question points is required!';
    }
    const pointsAsNumber = Number(value);

    if (
      pointsAsNumber === Number.NaN ||
      pointsAsNumber < 1 ||
      pointsAsNumber > 10
    ) {
      return 'Question points should be valid number between 1 and 10!';
    }

    return null;
  },
  answers: (value) => {
    if (!value) {
      return 'answers is required!';
    }

    if (!Array.isArray(value) || value.length < 1 || value.length > 4) {
      return 'answers should be an array of 1 to 4 answers!';
    }

    const errors = value
      .map((answer) => schemaValidator(answerCreateSchema, answer))
      .filter((error) => error != null);
    return errors.length > 0 ? errors : null;
  },
};

export default questionCreateSchema;
