import type { RequestHandler } from 'express';
import { HttpError } from '../errors/http-error.js';

export function methodNotAllowed(allowed: string): RequestHandler {
    return (req, res) => {
        res.set('Allow', allowed);
        throw new HttpError(405, 'Method not allowed');
    };
}