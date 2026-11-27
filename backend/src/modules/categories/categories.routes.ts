import { Router } from 'express';
import { methodNotAllowed } from '../../middleware/method-not-allowed.js';
import { getCategory, listCategories, createCategory } from './categories.controller.js';

export const categoriesRouter = Router();

categoriesRouter.route('/')
    .get(listCategories)
    .post(createCategory)
    .all(methodNotAllowed('GET, HEAD, POST'));

categoriesRouter.route('/:slug')
    .get(getCategory)
    .all(methodNotAllowed('GET, HEAD'));