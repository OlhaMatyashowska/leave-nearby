import { HttpError } from '../../errors/http-error.js';
import { CATEGORIES, type Category } from './categories.data.js';
import type { CreateCategoryInput } from './categories.schemas.js';

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

export function createCategory(input: CreateCategoryInput): Category {
    // a business rule: Zod can't check this, it needs the data
    const exists = CATEGORIES.some((c) => c.slug === input.slug);

    if (exists) {
        throw new HttpError(409, 'Category with this slug already exists');
    }

    const category: Category = {
        id: Math.max(0, ...CATEGORIES.map((c) => c.id)) + 1,   // the next id
        name: input.name,
        slug: input.slug,
    };

    CATEGORIES.push(category);
    return category;
}
