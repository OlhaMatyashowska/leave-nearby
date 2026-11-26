import { HttpError } from '../../errors/http-error.js';
import { CATEGORIES, type Category } from './categories.data.js';

export function getAllCategories(): Category[] {
    return CATEGORIES;
}

export function getCategoryBySlug(slug: string): Category {
    const category = CATEGORIES.find((c) => c.slug === slug);

    if (!category) {
        throw new HttpError(404, 'Category not found');
    }

    return category;
}