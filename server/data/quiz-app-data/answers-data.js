import pool from './pool.js';


const create = async (question, text, isTrue) => {
  const insertAnswer = `
      INSERT INTO answers (questionID, text, isTrue) 
      VAlUES (?, ?, ?)
  `;
  
  try {
      const result = await pool.query(insertAnswer, [question.id, text, isTrue]);
      return {
          id:result.insertId,
          text: text,
          isTrue: isTrue,
      };
  }
  catch (err) {
      console.log(`db insert failed ${err.message}`);
      return null;
  }
};

const answerFromEntity = (entity) => {
  return {
      id:entity.id,
      text: entity.text,
      isTrue: (entity.isTrue > 0),
  };
};

const getById = async (id) => {
  const getAnswer = `
      SELECT * from answers where id = ?
  `;

  try {
      const result = await pool.query(getAnswer, [id]);
      return answerFromEntity(result[0]);
  } 
  catch(err) {
      console.log(`db select failed ${err.message}`);
      return null;        
  }
};

const getByQuestion = async (id) => {
  const getAnswer = `
      SELECT * from answers where questionID = ?
  `;

  try {
      const result = await pool.query(getAnswer, [id]);
      return result.map(entity => answerFromEntity(entity));
  } 
  catch(err) {
      console.log(`db select failed ${err.message}`);
      return null;        
  }
};

export default {
  create,
  getById,
  getByQuestion,
};
