import {schemaValidator} from '../validators/schema-validator.js';
import answerFinishSchema from './answer-finish-schema.js';

const quizFinishSchema = {
    id: (value) => {
        if (!value) {
            return 'Quiz name is required!';
        }
  
        if (Number(value) === Number.NaN || Number(value) < 0) {
            return 'Quiz id should be a valid positive number!';
        }
        return null;
    },
    questionAnswers: (value) => {   
        if (!value) {
            return 'questionAnswers is required!';
        }

        if(!(value instanceof Array) || value.length < 1) {
            return 'questionAnswers should be an array with at least one answer!';
        }
        
        const errors = value.map(answer => schemaValidator(answerFinishSchema, answer)).filter(error => error != null);
        return errors.length > 0 ? errors : null;
    },
};

export default quizFinishSchema;