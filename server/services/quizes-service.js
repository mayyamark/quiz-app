const getQuizes = (quizesData) => {
  return async (page, limit, category, teacher) => {
    if (page || category || teacher) {
      let offset, settedLimit;
      
      if (limit) {
        settedLimit = limit;
        offset = (page - 1) * settedLimit;
      } else {
        settedLimit = 5;
        offset = (page - 1) * settedLimit;
      }

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

export default {
  getQuizes,
};
