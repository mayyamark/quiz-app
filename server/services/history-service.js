const getHistoryByStrudentId = (historyData) => {
  return async (userID, page, limit, quiz) => {
    if (page || quiz) {
      const settedLimit = limit ? limit : 5;
      const offset = (page - 1) * settedLimit;

      const allSearchedHistory = await historyData.searchBy(userID, quiz);
  
      if (page) {
        const historyOnPage = await historyData.searchByWithPages(userID, quiz, offset, settedLimit);
    
        return {
          history: historyOnPage,
          currentPage: page,
          historyCount: allSearchedHistory.length,
          hasNextPage: offset + settedLimit < allSearchedHistory.length,
          hasPreviousPage: page > 1,
        };
      } else {
        return {
          history: allSearchedHistory,
          historyCount: allSearchedHistory.length,
        };
      }
    }
  };
};

export default {
  getHistoryByStrudentId,
};
