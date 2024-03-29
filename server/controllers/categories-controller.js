import express from 'express';
import { USER_ROLES } from '../constants.js';
import authMiddleware from '../middlewares/auth-middleware.js';
import checkTokenMiddleware from '../middlewares/check-token-middlware.js';
import roleMiddleware from '../middlewares/role-middleware.js';
import bodyValidator from '../middlewares/body-validator.js';
import categoryCreateSchema from '../validators/category-create-schema.js';
import usersService from '../services/users-service.js';
import categoriesService from '../services/category-service.js';
import categoriesData from '../data/quiz-app-data/categories-data.js';
import blacklistData from '../data/blacklist-data/blacklist-data.js';

const categoriesController = express.Router();
categoriesController.use(authMiddleware, checkTokenMiddleware(usersService)(blacklistData));

categoriesController.post('/',
  roleMiddleware(USER_ROLES.TEACHER),
  bodyValidator(categoryCreateSchema),
  async (req, res) => {
    const result = await categoriesService.createCategory(categoriesData)(req.body);
    if (result.error) {
      res.status(409).send({error: 'Categories must be unique!'});
    } else {
      res.status(201).send(result.category);
    }
  });

categoriesController.get('/',
  async (req, res) => {
    const result = await categoriesService.getAllCategories(categoriesData)();
    if (result.error) {
      res.status(404).send([]);
    } else {
      res.status(200).send(result.categories);
    }
  });

export default categoriesController;
