/** Service layer.
 * @module services/historyService
 */
import serviceErrors from './service-errors.js';

/**
 * Service layer related on history.
 * @type { object }
 * @const
 * @namespace historyService
 */

/**
 * Returns a function, which gets a student's quiz history.
 * @author Mayya Markova
 * @memberof module:services/historyService~historyService
 * @param { object } historyData An object with data-layer functions.
 * @return { function } A function, which accepts search parameters and returns the matching results.
 */
const getHistoryByStrudentId = (historyData) => {
  /**
   * Gets the history, matching the search.
   * @author Mayya Markova
   * @memberof module:services/historyService~historyService
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
 * @memberof module:services/historyService~historyService
 * @param { object } historyData An object with data-layer functions.
 * @return { function } A function, which checks if the student has solved the given quiz.
 */
const isQuizSolvedByStudent = (historyData) => {
  /**
   * Returns the student's result if he/she has already solved the quiz or null-s if not.
   * @author Mayya Markova
   * @memberof module:services/historyService~historyService
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
 * @memberof module:services/historyService~historyService
 * @param { object } historyData An object with data-layer functions.
 * @return { function } A function, which logs that the student has started solving the given quiz.
 */
const startSolvingQuiz = (historyData) => {
  /**
   * Logs that the student has started solving the given quiz.
   * @author Mayya Markova
   * @memberof module:services/historyService~historyService
   * @async
   * @function startSolvingQuizInnerFunction
   * @param { string|number } userID The ID of the user.
   * @param { string|number } quizID The ID of the quiz.
   * @returns { Promise<object> } The start time.
   */
  return async (user, quizID) => {
    const startTime = await historyData.logStartSolving(user, quizID);

    if (!startTime) {
      return {
        startError: serviceErrors.BAD_REQUEST,
        startTime: null,
      };
    }

    return { startError: null, startTime };
  };
};

const evaluateAnswers = (question, answered) => {
  // the answer is false but the user marked it as true
  let userMarkedFalseAsTrue = question.answers
    .filter(answer => answered.markedTrue.includes(answer.id))
    .filter(answer => !answer.isTrue).length > 0;

  // if the answer is true but the user didn't mark it as true
  let userNotMarkedTrueAsTrue = question.answers
    .filter(answer => !answered.markedTrue.includes(answer.id))
    .filter(answer => answer.isTrue).length > 0;

  if (!userMarkedFalseAsTrue && !userNotMarkedTrueAsTrue) {
    return question.points;
  }

  return 0;
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
        timeout: {
          timeTaken: timeTaken,
          allowedTime: quiz.time,
        },
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

    let scores = quiz.questions.reduce((scores, question) => {
      // We've detect a cheat attempt, just return the -1 in the
      // accumulator object and don't do further calculations
      if (scores.totalScore === -1){
        return scores;
      }

      scores.totalScore += question.points;
      const answered = solvedQuizData.questionAnswers.filter(aQ => aQ.id === question.id);
      if (answered.length === 1) {
        scores.userScore += evaluateAnswers(question, answered[0]);
      }
      else if (answered.length > 1) {
        // This is a bad request, containing multiple answers to the same question,
        // coult be an attempt to cheat so invalidate the quiz
        scores.totalScore = -1;
        scores.userScore = -1;
      }
      return scores;
    }, {
      totalScore: 0,
      userScore: 0,
    });

    // We've detect a cheat attempt,
    // score quiz with 0 and return bad request
    if (scores.totalScore === -1) {
      historyData.logQuizScore(quizHistory.id, 0);
      return {
        error: serviceErrors.BAD_REQUEST,
      };
    }
    else {
      await historyData.logQuizScore(quizHistory.id, scores.userScore);
      return {
        error: null,
        result: {
          score: scores.userScore,
          totalScore: scores.totalScore,
          history: await historyData.getById(quizHistory.id),
        },
      };
    }
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
