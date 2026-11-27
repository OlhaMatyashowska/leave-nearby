import { HttpError } from '../../errors/http-error.js';
import { CreateCityInput } from './cities.schemas.js';
import { CITIES, type City } from './cities.data.js';

export function getAllCities(search?: string): City[] {
    if (search) {
        const normalizedSearch = search.toLowerCase();
        return CITIES.filter(city => city.name.toLowerCase().includes(normalizedSearch));
    }
    return CITIES;
};

export function getCityBySlug(slug: string): City {
    const city = CITIES.find(c => c.slug === slug);
    if (!city) {
        throw new HttpError(404, 'City not found');
    }
    return city;
};

export function createCity(input: CreateCityInput): City {
    const exists = CITIES.some((c) => c.slug === input.slug);

    if (exists) {
        throw new HttpError(409, 'City with this slug already exists');
    }

    const city: City = {
        id: Math.max(0, ...CITIES.map((c) => c.id)) + 1,   // the next id
        name: input.name,
        slug: input.slug,
    };

    CITIES.push(city);
    return city;
}
