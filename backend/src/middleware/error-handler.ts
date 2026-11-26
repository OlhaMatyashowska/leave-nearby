import type { ErrorRequestHandler } from 'express';
import { HttpError } from '../errors/http-error.js';

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
    // 1. An expected error we threw ourselves → its own status and message
    if (err instanceof HttpError) {
        res.status(err.status).json({ error: err.message });
        return;
    }

    if (err.type && err.type === 'entity.parse.failed') {
        res.status(400).json({ error: 'Invalid JSON' });
        return;
    }

    // 2. Anything else is a bug → log everything, tell the client nothing
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
};