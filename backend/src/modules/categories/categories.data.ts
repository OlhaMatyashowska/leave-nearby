export type Category = {
    id: number;
    name: string;
    slug: string;
};

export const CATEGORIES: Category[] = [
    { id: 1, name: 'Лікар', slug: 'doctor' },
    { id: 2, name: 'Ветеринар', slug: 'veterinarian' },
    { id: 3, name: 'Репетитор', slug: 'tutor' },
    { id: 4, name: 'Косметолог', slug: 'cosmetologist' },
];