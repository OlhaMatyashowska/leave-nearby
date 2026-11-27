import type { Request, Response } from 'express';
import * as citiesService from './cities.service.js';
import { listCitiesQuerySchema, cityParamsSchema, createCitySchema } from './cities.schemas.js'

export function listCities(req: Request, res: Response) {
    const { search } = listCitiesQuerySchema.parse(req.query);
    const cities = citiesService.getAllCities(search);
    res.json(cities);
}

export function getCity(req: Request, res: Response) {
    const { slug } = cityParamsSchema.parse(req.params);
    const city = citiesService.getCityBySlug(slug);
    res.json(city);
}

export function createCity(req: Request, res: Response) {
    const input = createCitySchema.parse(req.body);
    const city = citiesService.createCity(input);
    res.status(201).json(city);
}