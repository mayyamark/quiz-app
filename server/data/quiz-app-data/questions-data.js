import pool from './pool.js';
import answers from './answers-data.js';

const create = async (quiz, points, text) => {
  const insertQuestion = `
        INSERT INTO questions (quizID, points, text)
        VAlUES (?, ?, ?)
    `;

  try {
    const result = await pool.query(insertQuestion, [quiz.id, points, text]);
    return {
      id:result.insertId,
      points: points,
      text: text,
    };
  }
  catch (err) {
    console.log(`db insert failed ${err.message}`);
    return null;
  }
};

const questionFromEntity = async (entity) => {
  return {
    id:entity.id,
    points: entity.points,
    text: entity.text,
    answers: await answers.getByQuestion(entity.id),
  };
};

const getById = async (id) => {
  const getQuestion = `
        SELECT * from questions where id = ?
    `;

  try {
    const result = await pool.query(getQuestion, [id]);
    return await questionFromEntity(result[0]);
  }
  catch (err) {
    console.log(`db select failed ${err.message}`);
    return null;
  }
};

const getByQuiz = async (id) => {
  const getQuestion = `
        SELECT * from questions where quizID = ?
    `;

  try {
    const result = await pool.query(getQuestion, [id]);
    return await Promise.all(result.map(entity => questionFromEntity(entity)));
  }
  catch (err) {
    console.log(`db select failed ${err.message}`);
    return null;
  }
};

export default {
  create,
  getById,
  getByQuiz,
};
