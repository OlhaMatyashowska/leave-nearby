import { Router } from 'express';
import { methodNotAllowed } from '../../middleware/method-not-allowed.js';
import { getCity, listCities } from "./cities.controller.js"

export const citiesRouter = Router();

citiesRouter.route('/')
    .get(listCities)
    .all(methodNotAllowed('GET, HEAD'));

citiesRouter.route('/:slug')
    .get(getCity)
    .all(methodNotAllowed('GET, HEAD'));