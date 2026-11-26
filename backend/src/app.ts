import express from 'express';
import { errorHandler } from './middleware/error-handler.js';
import { notFound } from './middleware/not-found.js';
import { citiesRouter } from './modules/cities/cities.routes.js';
import { categoriesRouter } from './modules/categories/categories.routes.js';

export const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api/categories', categoriesRouter);
app.use('/api/cities', citiesRouter);

app.use(notFound);       // after all routes
app.use(errorHandler);   // very last