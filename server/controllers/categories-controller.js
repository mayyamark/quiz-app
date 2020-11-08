import express from 'express';
import { USER_ROLES } from '../config.js';
import authMiddleware from '../middlewares/auth-middleware.js';
import checkTokenMiddleware from '../middlewares/check-token-middlware.js';
import roleMiddleware from '../middlewares/role-middleware.js';
import bodyValidator from '../middlewares/body-validator.js';
import categoryCreateSchema from '../validators/category-create-schema.js';
import usersService from '../services/users-service.js';
import categoriesService from '../services/category-service.js';

const categoriesController = express.Router();
// categoriesController.use(authMiddleware, checkTokenMiddleware(usersService));

categoriesController.post('/',
    roleMiddleware(USER_ROLES.TEACHER),
    bodyValidator(categoryCreateSchema),  
    async (req, res) => {
        const result = await categoriesService.createCategory(req.body);
        if(result.error) {
            res.status(409).send({error: 'Category name must be unique'});
        } else {
            res.status(201).send(result.category);
        }
});


categoriesController.get('/', 
    async (req, res) => {
        const result = await categoriesService.getAllCategories();
        if(result.error) {
            res.status(404).send([]);
        } else {
            res.status(200).send(result.categories);
        }
});

export default categoriesController;