import { HttpError } from '../../errors/http-error.js';
import { CITIES, type City } from './cities.data.js';

export function getAllCities(search?: string): City[] {
    if (search) {
        const normalizedSearch = search.trim().toLowerCase();
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