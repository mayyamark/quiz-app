import pool from './pool.js';

const create = async (name) => {
  const insertCategory = `
    INSERT INTO categories (category)
    VALUES (?);
  `;

  try {
    const result = await pool.query(insertCategory, [name]);
    return {
      id: result.insertId,
      name: name,
      isActive: false,
    };
  }
  catch (err) {
    console.log(`db insert failed ${err.message}`);
    return null;
  }
};

const getByName = async (name) => {
  const getCategory = `
    SELECT *
    FROM categories
    WHERE category = ?
  `;

  try {
    const result = await pool.query(getCategory, [name]);
    return {
      id: result[0].id,
      name: result[0].category,
    };
  }
  catch (err) {
    console.log(`db select failed ${err.message}`);
    return null;
  }
};

const getById = async (id) => {
  const getCategory = `
    SELECT *
    FROM categories
    WHERE id = ?
  `;

  try {
    const result = await pool.query(getCategory, [id]);
    return {
      id: result[0].id,
      name: result[0].category,
    };
  }
  catch (err) {
    console.log(`db select failed ${err.message}`);
    return null;
  }
};

const getAll = async () => {
  const getAllCategories = `
    SELECT *
    FROM categories
  `;
  try {
    const result = await pool.query(getAllCategories);
    const categories = result.map(entity => {
      return {
        id: entity.id,
        name: entity.category,
      };
    });

    return await Promise.all(categories.map(async cat => {
      const categoryControlSql = `
        SELECT *
        FROM quizes
        WHERE categoryID = ?;
      `;

      const categoryControlData = await pool.query(categoryControlSql, [cat.id]);

      if (categoryControlData[0]) {
        cat.isActive = true;
      } else {
        cat.isActive = false;
      }

      return cat;
    }));
  }
  catch (err){
    console.log(`db insert failed ${err.message}`);
    return null;
  }
};

export default {
  create,
  getById,
  getByName,
  getAll,
};
