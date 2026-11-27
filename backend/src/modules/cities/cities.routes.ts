import { Router } from 'express';
import { methodNotAllowed } from '../../middleware/method-not-allowed.js';
import { getCity, listCities, createCity } from "./cities.controller.js"

export const citiesRouter = Router();

citiesRouter.route('/')
    .get(listCities)
    .post(createCity)
    .all(methodNotAllowed('GET, HEAD, POST'));

citiesRouter.route('/:slug')
    .get(getCity)
    .all(methodNotAllowed('GET, HEAD'));