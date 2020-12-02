import { schemaValidator } from '../validators/schema-validator.js';
import categoryCreateSchema from './category-create-schema.js';
import questionCreateSchema from './question-create-schema.js';

const quizCreateSchema = {
  name: (value) => {
    if (!value) {
      return 'Quiz name is required!';
    }

    if (typeof value !== 'string' || value.length < 1 || value.length > 75) {
      return 'Quiz name should be a string in range [1..75]!';
    }

    return null;
  },
  timeLimit: (value) => {
    if (!value) {
      return 'The field timeLimit is required!';
    }
    const pointsAsNumber = Number(value);
    if (pointsAsNumber === Number.NaN) {
      return 'The field timeLimit should be valid number!';
    }

    return null;
  },
  category: (value) => {
    return schemaValidator(categoryCreateSchema, { name: value });
  },
  questions: (value) => {
    if (!value) {
      return 'The field questions are required!';
    }

    if (!(value instanceof Array) || value.length < 2 || value.length > 50) {
      return 'The field questions should be an array of 2 to 50 questions!';
    }

    const errors = value
      .map((question) => schemaValidator(questionCreateSchema, question))
      .filter((error) => error != null);
    return errors.length > 0 ? errors : null;
  },
};

export default quizCreateSchema;
