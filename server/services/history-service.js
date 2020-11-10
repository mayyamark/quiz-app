import serviceErrors from './service-errors.js';
/**
 * Returns a function, which gets a student's quiz history.
 * @author Mayya Markova
 * @param { object } historyData An object with data-layer functions.
 * @return { function } A function, which accepts search parameters and returns the matching results.
 */
const getHistoryByStrudentId = (historyData) => {
  /**
   * Gets the history, matching the search.
   * @author Mayya Markova
   * @async
   * @function getHistoryByStrudentIdInnerFunction
   * @param { string|number } userID Search parameter: the user's ID.
   * @param { number|undefined } page Search parameter: the page number.
   * @param { number|undefined } limit Search parameter: the number of results per page.
   * @param { string|undefined } quiz Search parameter: the quiz's name.
   * @returns { Promise<object> } The matching results and if the page parameter
   * is defined- page information.
   */
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

/**
 * Returns a function, which checks if the student has solved the given quiz.
 * @author Mayya Markova
 * @param { object } historyData An object with data-layer functions.
 * @return { function } A function, which checks if the student has solved the given quiz.
 */
const isQuizSolvedByStudent = (historyData) => {
  /**
   * Returns the student's result if he/she has already solved the quiz or null-s if not.
   * @author Mayya Markova
   * @async
   * @function isQuizSolvedByStudentInnerFunction
   * @param { string|number } userID The ID of the user.
   * @param { string|number } quizID The ID of the quiz.
   * @returns { Promise<object> } The history and an error or null-s.
   */
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

/**
 * Returns a function, which logs that the student has started solving the given quiz.
 * @author Mayya Markova
 * @param { object } historyData An object with data-layer functions.
 * @return { function } A function, which logs that the student has started solving the given quiz.
 */
const startSolvingQuiz = (historyData) => {
  /**
   * Logs that the student has started solving the given quiz.
   * @author Mayya Markova
   * @async
   * @function startSolvingQuizInnerFunction
   * @param { string|number } userID The ID of the user.
   * @param { string|number } quizID The ID of the quiz.
   * @returns { Promise<object> } The start time.
   */
  return async (userID, quizID) => await historyData.logStartSolving(userID, quizID);
};

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
