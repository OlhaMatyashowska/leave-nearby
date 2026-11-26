import type { Request, Response } from 'express';
import * as citiesService from './cities.service.js';

export function listCities(req: Request, res: Response) {
    const search = req.query.search;
    const cities = citiesService.getAllCities(search as string | undefined);
    res.json(cities);
}

export function getCity(req: Request<{ slug: string }>, res: Response) {
    const city = citiesService.getCityBySlug(req.params.slug);
    res.json(city);
}