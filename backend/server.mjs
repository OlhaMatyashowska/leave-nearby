import http from 'node:http';

const PORT = process.env.PORT || 3000;

const CITIES = [
    { id: 1, name: "Ужгород", slug: "uzhhorod" },
    { id: 2, name: "Мукачево", slug: "mukachevo" },
    { id: 3, name: "Хуст", slug: "khust" },
    { id: 4, name: "Берегово", slug: "beregovo" },
];

const CATEGORIES = [
    { id: 1, name: "лікар", slug: "doctor" },
    { id: 2, name: "ветеринар", slug: "veterinarian" },
    { id: 3, name: "репетитор", slug: "tutor" },
    { id: 4, name: "косметолог", slug: "cosmetologist" },
]

const sendJson = (res, statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    console.log(req.method, req.url);

    if (req.method === 'GET' && url.pathname.startsWith('/health')) {
        sendJson(res, 200, { status: 'ok' });
        return;
    }

    // TODO: тут будуть твої маршрути
    // GET /api/cities?search=уж
    if (req.method === 'GET' && url.pathname === '/api/cities') {
        const search = url.searchParams.get('search')?.toLowerCase();

        if (search) {
            const filteredCities = CITIES.filter(city =>
                city.name.toLowerCase().includes(search)
            );

            sendJson(res, 200, filteredCities);
            return;
        }

        sendJson(res, 200, CITIES);
        return;
    }
    // GET /api/cities/uzhhorod
    if (req.method === 'GET' && url.pathname.startsWith('/api/cities/')) {
        const slug = url.pathname.split('/').pop();

        const city = CITIES.find(city => city.slug === slug);

        if (!city) {
            sendJson(res, 404, { message: 'City not found' });
            return;
        }

        sendJson(res, 200, city);
        return;
    }

    // Unsupported methods for /api/cities
    if (url.pathname === '/api/cities' && req.method !== 'GET') {
        sendJson(res, 405, { message: 'Method Not Allowed' });
        return;
    }

    if (req.method === 'GET' && url.pathname === "/api/categories") {
        sendJson(res, 200, CATEGORIES);
        return;
    }

    sendJson(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});