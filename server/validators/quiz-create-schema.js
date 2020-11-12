import {schemaValidator} from '../validators/schema-validator.js';
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
      return 'timeLimit is required!';
    }
    const pointsAsNumber = Number(value);
    if (pointsAsNumber === Number.NaN) {
      return 'timeLimit should be valid number!';
    }

    return null;
  },
  category: (value) => {
    return schemaValidator(categoryCreateSchema, {name: value});
  },
  questions: (value) => {
    if (!value) {
      return 'questions is required!';
    }

    if (!(value instanceof Array) || value.length < 1 || value.length > 50) {
      return 'questions should be an array of 1 to 50 questions!';
    }

    const errors = value.map(question => schemaValidator(questionCreateSchema, question)).filter(error => error != null);
    return errors.length > 0 ? errors : null;
  },
};

export default quizCreateSchema;