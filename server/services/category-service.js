import serviceErrors from './service-errors.js';

const createCategory = (categoriesData) => async (category) => {
  const cat = await categoriesData.create(category.name.toLowerCase());
  if (cat) {
    return {
      error: null,
      category: cat,
    };
  }

  return {
    error: serviceErrors.DUPLICATE_RESOURCE,
    category: null,
  };
};

const getAllCategories = (categoriesData) => async () => {
  const cats = await categoriesData.getAll();
  if (cats){
    return {
      error: null,
      categories: cats,
    };
  }

  return {
    error: serviceErrors.RESOURCE_NOT_FOUND,
    categories: null,
  };
};

export default {
  createCategory,
  getAllCategories,
};
