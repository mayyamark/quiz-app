import serviceErrors from './service-errors.js';

const getQuizes = (quizesData) => {
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

const createQuestion = (questionsData, answersData) => async (quiz, question) => {
  const quizQuestion = await questionsData.create(
      quiz, 
      question.points, 
      question.text,
  );
  quizQuestion.answers = [];

  for(const answer of question.answers) {
    const questAnswer = await answersData.create(
      quizQuestion,
      answer.text,
      answer.isTrue,
    );

    if(!questAnswer){
      return null;
    }

    quizQuestion.answers.push(questAnswer);
  }

  return quizQuestion;
};

const createQuiz = (quizesData, questionsData, answersData, categoriesData) =>  async (user, quizData) => {
  const category = await categoriesData.getByName(quizData.category);

  if(!category){
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

  if(!quiz){
    return {
      error: serviceErrors.BAD_REQUEST,
      quiz: null,
    };
  }

  quiz.questions = [];

  for(const question of quizData.questions) {
    const quizQuestion = await createQuestion(questionsData, answersData)(quiz, question);
    if(!quizQuestion){
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
