import z from "zod";

export const slugSchema = z
    .string()
    .regex(/^[a-z0-9-]+$/, 'Slug may contain only a-z, 0-9 and "-"');