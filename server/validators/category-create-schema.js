const categoryCreateSchema = {
  name: (value) => {
    if (!value) {
      return 'Category name is required!';
    }

    if (typeof value !== 'string' || value.length < 1 || value.length > 25) {
      return 'Category name should be a string in range [1..25]!';
    }
    return null;
  },
};

export default categoryCreateSchema;
