import { Router } from 'express';
import { methodNotAllowed } from '../../middleware/method-not-allowed.js';
import { getCategory, listCategories } from './categories.controller.js';

export const categoriesRouter = Router();

categoriesRouter.route('/')
    .get(listCategories)
    .all(methodNotAllowed('GET, HEAD'));

categoriesRouter.route('/:slug')
    .get(getCategory)
    .all(methodNotAllowed('GET, HEAD'));