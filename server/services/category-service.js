import categories from '../data/quiz-app-data/categories-data.js';
import serviceErrors from './service-errors.js';

const createCategory = async (categoryData) => {
    const category = await categories.create(categoryData.name.toLowerCase());
    if (category) {
        return {
            error: null,
            category: category,
        };
    }

    return {
        error: serviceErrors.DUPLICATE_RESOURCE,
        category: null,
    };
};

const getAllCategories = async () => {
    const cats = await categories.getAll();
    if(cats) {
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