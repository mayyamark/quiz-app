import serviceErrors from './service-errors.js';

const getQuizes = (quizesData) => {
  return async (page, limit, category, teacher) => {
    if (page || category || teacher) {
      const settedLimit = limit ? limit : 5;
      const offset = (page - 1) * settedLimit;

      const allSearchedQuizes = await quizesData.searchBy(category, teacher);

      if (page) {
        const quizesOnPage = await quizesData.searchByWithPages(category, teacher, offset, settedLimit);

        return {
          quizes: quizesOnPage,
          currentPage: page,
          quizesCount: allSearchedQuizes.length,
          hasNextPage: offset + limit < allSearchedQuizes.length,
          hasPreviousPage: page > 1,
        };
      } else {
        return {
          quizes: allSearchedQuizes,
          quizesCount: allSearchedQuizes.length,
        };
      }
    }
  };
};

const getQuizById = (quizesData) => {
  return async (quizID) => {
    const quiz = await quizesData.getById(quizID);

    if (!quiz) {
      return { 
        quiz: null, 
        quizError: serviceErrors.RESOURCE_NOT_FOUND,
      };
    }

    return { 
      quiz, 
      quizError: null,
    };
  };
};

export default {
  getQuizes,
  getQuizById,
};
