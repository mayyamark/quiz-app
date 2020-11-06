const getQuizes = (quizesData) => {
  return async (page, category, teacher) => {
    if (page || category || teacher) {
      const limit = 5;
      const offset = (page - 1) * limit;

      const allSearchedQuizes = await quizesData.searchBy(category, teacher);

      if (page) {
        const quizesOnPage = await quizesData.searchByWithPages(category, teacher, offset, limit);

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

export default {
  getQuizes,
};
