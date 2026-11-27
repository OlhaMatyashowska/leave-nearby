import { z } from 'zod';
import { slugSchema } from '../../common/schemas.js';

// for GET /api/categories/:slug
export const categoryParamsSchema = z.object({
    slug: slugSchema,
});

// for POST /api/categories
export const createCategorySchema = z.object({
    name: z.string().trim().min(2).max(50),
    slug: slugSchema,
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;