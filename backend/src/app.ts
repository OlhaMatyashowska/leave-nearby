import express, {
    type NextFunction,
    type Request,
    type Response
} from 'express';

type City = {
    id: number;
    name: string;
    slug: string;
};

type Category = {
    id: number;
    name: string;
    slug: string;
};

const CITIES: City[] = [
    { id: 1, name: "Ужгород", slug: "uzhhorod" },
    { id: 2, name: "Мукачево", slug: "mukachevo" },
    { id: 3, name: "Хуст", slug: "khust" },
    { id: 4, name: "Берегове", slug: "beregove" },
];

const CATEGORIES: Category[] = [
    { id: 1, name: "лікар", slug: "doctor" },
    { id: 2, name: "ветеринар", slug: "veterinarian" },
    { id: 3, name: "репетитор", slug: "tutor" },
    { id: 4, name: "косметолог", slug: "cosmetologist" },
]


export const app = express();

app.use(express.json()); // parses JSON request bodies (we'll need it for POST soon)

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/api/cities', (req, res) => {
    const { search } = req.query;

    if (typeof search === 'string' && search.trim() !== '') {
        const normalizedSearch = search.trim().toLowerCase();

        const filteredCities = CITIES.filter(city =>
            city.name.toLowerCase().includes(normalizedSearch)
        );

        return res.status(200).json(filteredCities);
    }

    return res.status(200).json(CITIES);
});

app.get('/api/cities/:slug', (req, res) => {
    const city = CITIES.find(c => c.slug === req.params.slug);
    if (!city) {
        return res.status(404).json({ error: 'City not found' });
    }
    res.status(200).json(city);
});

app.get('/api/categories', (req, res) => {
    res.status(200).json(CATEGORIES);
});

// Unsupported methods for cities endpoints
app.all(['/api/cities', '/api/cities/:slug'], (req, res) => {
    res.set('Allow', 'GET, HEAD');

    return res.status(405).json({
        error: 'Method Not Allowed',
    });
});

// Fallback for unknown routes
app.use((req: Request, res: Response) => {
    return res.status(404).json({
        error: 'Not found',
    });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
    });
});