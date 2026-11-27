import type { Request, Response } from 'express';
import * as categoriesService from './categories.service.js';
import { categoryParamsSchema, createCategorySchema } from './categories.schemas.js';

export function listCategories(req: Request, res: Response) {
    const categories = categoriesService.getAllCategories();
    res.json(categories);
}

export function getCategory(req: Request, res: Response) {
    const { slug } = categoryParamsSchema.parse(req.params);
    const category = categoriesService.getCategoryBySlug(slug);
    res.json(category);
}

export function createCategory(req: Request, res: Response) {
    const input = createCategorySchema.parse(req.body);
    const category = categoriesService.createCategory(input);
    res.status(201).json(category);
}