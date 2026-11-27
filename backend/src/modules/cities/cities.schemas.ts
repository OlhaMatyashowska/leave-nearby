import { z } from 'zod';
import { slugSchema } from '../../common/schemas.js';

export const listCitiesQuerySchema = z.object({
    search: z.string().trim().max(50).optional(),
});

export const cityParamsSchema = z.object({
    slug: slugSchema,
});

export const createCitySchema = z.object({
    name: z.string().trim().min(2).max(50),
    slug: slugSchema,
});

export type CreateCityInput = z.infer<typeof createCitySchema>;