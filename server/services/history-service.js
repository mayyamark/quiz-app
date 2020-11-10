import serviceErrors from './service-errors.js';

const getHistoryByStrudentId = (historyData) => {
  return async (userID, page, limit, quiz) => {
    if (page || quiz) {
      const settedLimit = limit ? limit : 5;
      const offset = (page - 1) * settedLimit;

      const allSearchedHistory = await historyData.searchBy(userID, quiz);

      if (page) {
        const historyOnPage = await historyData.searchByWithPages(
          userID,
          quiz,
          offset,
          settedLimit,
        );

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

const isQuizSolvedByStudent = (historyData) => {
  return async (userID, quizID) => {
    const history = await historyData.getSolveInfo(userID, quizID);

    if (history) {
      return {
        history,
        historyError: serviceErrors.DUPLICATE_RESOURCE,
      };
    }

    return { history: null, historyError: null };
  };
};

const startSolvingQuiz = (historyData) => async (userID, quizID) =>
  await historyData.logStartSolving(userID, quizID);

const finishSolvingQuiz = (historyData, quizesData) =>
  async (user, solvedQuizData) => {
    const [quizHistory, quiz] = await Promise.all([
      historyData.getSolveInfo(user.id, solvedQuizData.id),
      quizesData.getById(solvedQuizData.id),
    ]);

    if (!quizHistory || !quiz) {
      return {
        error: serviceErrors.RESOURCE_NOT_FOUND,
      };
    }

    const finishTime = new Date();
    // time taken from milliseconds to seconds to minutes
    const timeTaken = (finishTime - quizHistory.started)/1000/60;
    if (timeTaken > quiz.time) {
      return {
        error: serviceErrors.TIMEOUT,
      };
    }

    if (!historyData.logFinishSolving(quizHistory.id, finishTime)) {
      return {
        error: serviceErrors.BAD_REQUEST,
        timeout: {
          timeTaken: timeTaken,
          allowedTime: quiz.time,
        },
      };
    }

    let totalScore = 0;
    let userScore = 0;
    for (let question of quiz.questions){
      totalScore += question.points;
      const answered = solvedQuizData.questionAnswers.filter(aQ => aQ.id === question.id);
      if (answered.length === 1) {
        let userAnsweredCorrectly = true;
        for (let answer of question.answers) {
          const markedAsTrue = answered[0].markedTrue.includes(answer.id);
          if (
            // if the answer is true but the user didn't mark it as true
              (answer.isTrue && !markedAsTrue)
            ||
            // the answer is false but the user marked it as false
              (!answer.isTrue && markedAsTrue)
            ) {
              // then the user didn't answer correctly
              userAnsweredCorrectly = false;
          }
        }
        if (userAnsweredCorrectly) {
          userScore += question.points;
        }
      }
      else if (answered.length > 1) {
        // This is a bad request, containing multiple answers to the same question,
        // coult be an attempt to cheat so invalidate the quiz
        historyData.logQuizScore(quizHistory.id, 0);
        return {
          error: serviceErrors.BAD_REQUEST,
        };
      }
    }
    historyData.logQuizScore(quizHistory.id, userScore);
    return {
      error: null,
      result: {
        score: userScore,
        totalScore: totalScore,
      },
    };
};

const getHistoryByQuizId = (historyData) => {
  return async (quizId, page, limit) => {
    let offset;
    let setLimit;

    if (page) {
      setLimit = limit ? limit : 5;
      offset = (page - 1) * setLimit;
    }

    const historyOnPage = await historyData.searchByQuizIdPaged(quizId, offset, setLimit);
    const result = {
      history: historyOnPage.history,
    };

    if (page) {
      result.currentPage = page;
      result.historyCount = historyOnPage.entriesCount;
      result.hasNextPage = (offset + setLimit) < historyOnPage.entriesCount;
      result.hasPreviousPage = page > 1;
    }

    return result;
  };
};

export default {
  getHistoryByStrudentId,
  isQuizSolvedByStudent,
  startSolvingQuiz,
  finishSolvingQuiz,
  getHistoryByQuizId,
};
