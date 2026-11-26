import type { RequestHandler } from 'express';
import { HttpError } from '../errors/http-error.js';

export const notFound: RequestHandler = () => {
    throw new HttpError(404, 'Not found');
};