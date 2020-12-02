/** Service layer.
 * @module services/quizzesService
 */

import serviceErrors from './service-errors.js';

/**
 * Service layer related on quizzes.
 * @type { object }
 * @const
 * @namespace quizzesService
 */

/**
 * Returns a function, which gets quizzes by given search parameters.
 * @author Mayya Markova
 * @memberof module:services/quizzesService~quizzesService
 * @param { object } quizzesData An object with data-layer functions.
 * @return { function } A function, which accepts search parameters and returns the matching results.
 */
const getQuizzes = (quizzesData) => {
  /**
   * Gets quizzes, matching the search.
   * @author Mayya Markova
   * @memberof module:services/quizzesService~quizzesService
   * @async
   * @function getQuizzesInnerFunction
   * @param { number|undefined } page Search parameter: the page number.
   * @param { number|undefined } limit Search parameter: the number of quizzes per page.
   * @param { string|undefined } category Search parameter: the category's name.
   * @param { string|undefined } teacher Search parameter: the author's name.
   * @param { object } user An object with information about the user.
   * @returns { Promise<object> } The matching quizzes and if the page parameter
   * is defined- page information.
   */
  return async (page, limit, category, teacher, user) => {
    if (page || category || teacher) {
      const settedLimit = limit ? limit : 5;
      const offset = (page - 1) * settedLimit;

      const allSearchedQuizzes = await quizzesData.searchBy(category, teacher);

      if (page) {
        const quizzesOnPage = await quizzesData.searchByWithPages(
          category,
          teacher,
          offset,
          settedLimit,
          user,
        );

        return {
          quizzes: quizzesOnPage,
          currentPage: page,
          quizzesCount: allSearchedQuizzes.length,
          hasNextPage: offset + limit < allSearchedQuizzes.length,
          hasPreviousPage: page > 1,
        };
      } else {
        return {
          quizzes: allSearchedQuizzes,
          quizzesCount: allSearchedQuizzes.length,
        };
      }
    }
  };
};

/**
 * Returns a function, which gets a quiz by its ID
 * @author Mayya Markova
 * @memberof module:services/quizzesService~quizzesService
 * @param { object } quizzesData An object with data-layer functions.
 * @return { function } A function, which accepts the ID and returns the quiz or an error.
 */
const getQuizById = (quizzesData) => {
  /**
   * Gets a quiz by its ID.
   * @author Mayya Markova
   * @memberof module:services/quizzesService~quizzesService
   * @async
   * @function getQuizByIdInnerFunction
   * @param { string|number } quizID The ID of the quiz.
   * @returns { Promise<object> } The quiz or an error.
   */
  return async (quizID) => {
    const quiz = await quizzesData.getById(quizID);

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

const createQuestion = (questionsData, answersData) => async (quiz, question) => {
  const quizQuestion = await questionsData.create(
    quiz,
    question.points,
    question.text,
  );
  quizQuestion.answers = [];

  for (const answer of question.answers) {
    const questAnswer = await answersData.create(
      quizQuestion,
      answer.text,
      answer.isTrue,
    );

    if (!questAnswer) {
      return null;
    }

    quizQuestion.answers.push(questAnswer);
  }

  return quizQuestion;
};

const createQuiz = (quizzesData, questionsData, answersData, categoriesData) =>  async (user, quizData) => {
  const category = await categoriesData.getByName(quizData.category);

  if (!category) {
    return {
      error: serviceErrors.RESOURCE_NOT_FOUND,
      quiz: null,
    };
  }

  const quiz = await quizzesData.create(
    quizData.name,
    quizData.timeLimit,
    user,
    category,
  );

  if (!quiz) {
    return {
      error: serviceErrors.BAD_REQUEST,
      quiz: null,
    };
  }

  quiz.questions = [];

  for (const question of quizData.questions) {
    const quizQuestion = await createQuestion(questionsData, answersData)(quiz, question);
    if (!quizQuestion) {
      return {
        error: serviceErrors.BAD_REQUEST,
        quiz: null,
      };
    }
    quiz.questions.push(quizQuestion);
  }

  return {
    error: null,
    quiz: quiz,
  };
};

export default {
  getQuizzes,
  getQuizById,
  createQuiz,
};
