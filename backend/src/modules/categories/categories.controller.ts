import type { Request, Response } from 'express';
import * as categoriesService from './categories.service.js';

export function listCategories(req: Request, res: Response) {
    const categories = categoriesService.getAllCategories();
    res.json(categories);
}

export function getCategory(req: Request<{ slug: string }>, res: Response) {
    const category = categoriesService.getCategoryBySlug(req.params.slug);
    res.json(category);
}