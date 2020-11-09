const answerCreateSchema = {
  text: (value) => {
    if (!value) {
      return 'Answer text is required!';
    }

    if (typeof value !== 'string' || value.length < 1 || value.length > 75) {
      return 'Answer text name should be a string in range [1..75]!';
    }

    return null;
  },
  isTrue: (value) => {
    if (value === undefined) {
      return 'Answer isTrue is required!';
    }

    if (typeof value !== 'boolean') {
      return 'Answer isTrue should be a boolean value!';
    }

    return null;
  },
};

export default answerCreateSchema;
