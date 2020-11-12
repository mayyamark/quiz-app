/** Service layer.
 * @module services/quizesService
 */

import serviceErrors from './service-errors.js';

/**
 * Service layer related on quizes.
 * @type { object }
 * @const
 * @namespace quizesService
 */

/**
 * Returns a function, which gets quizes by given search parameters.
 * @author Mayya Markova
 * @memberof module:services/quizesService~quizesService
 * @param { object } quizesData An object with data-layer functions.
 * @return { function } A function, which accepts search parameters and returns the matching results.
 */
const getQuizes = (quizesData) => {
  /**
   * Gets quizes, matching the search.
   * @author Mayya Markova
   * @memberof module:services/quizesService~quizesService
   * @async
   * @function getQuizesInnerFunction
   * @param { number|undefined } page Search parameter: the page number.
   * @param { number|undefined } limit Search parameter: the number of quizes per page.
   * @param { string|undefined } category Search parameter: the category's name.
   * @param { string|undefined } teacher Search parameter: the author's name.
   * @returns { Promise<object> } The matching quizes and if the page parameter
   * is defined- page information.
   */
  return async (page, limit, category, teacher) => {
    if (page || category || teacher) {
      const settedLimit = limit ? limit : 5;
      const offset = (page - 1) * settedLimit;

      const allSearchedQuizes = await quizesData.searchBy(category, teacher);

      if (page) {
        const quizesOnPage = await quizesData.searchByWithPages(
          category,
          teacher,
          offset,
          settedLimit,
        );

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

/**
 * Returns a function, which gets a quiz by its ID
 * @author Mayya Markova
 * @memberof module:services/quizesService~quizesService
 * @param { object } quizesData An object with data-layer functions.
 * @return { function } A function, which accepts the ID and returns the quiz or an error.
 */
const getQuizById = (quizesData) => {
  /**
   * Gets a quiz by its ID.
   * @author Mayya Markova
   * @memberof module:services/quizesService~quizesService
   * @async
   * @function getQuizByIdInnerFunction
   * @param { string|number } quizID The ID of the quiz.
   * @returns { Promise<object> } The quiz or an error.
   */
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

const createQuiz = (quizesData, questionsData, answersData, categoriesData) =>  async (user, quizData) => {
  const category = await categoriesData.getByName(quizData.category);

  if (!category) {
    return {
      error: serviceErrors.RESOURCE_NOT_FOUND,
      quiz: null,
    };
  }

  const quiz = await quizesData.create(
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
  getQuizes,
  getQuizById,
  createQuiz,
};
