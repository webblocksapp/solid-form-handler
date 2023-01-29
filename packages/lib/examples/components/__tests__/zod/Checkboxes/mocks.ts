import { z } from 'zod';

export const schema = z.object({
  favoriteFoods: z.array(z.number()).min(1, 'favoriteFoods is a required field'),
});

export type Schema = z.infer<typeof schema>;

export const FAVORITE_FOODS = [
  { value: 1, label: 'Pizza' },
  { value: 2, label: 'Hot Dog' },
  { value: 3, label: 'Ice Cream' },
];
