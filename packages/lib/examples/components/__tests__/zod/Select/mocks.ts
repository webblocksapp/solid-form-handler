import { z } from 'zod';

export const schema = z.object({
  country: z.coerce.number().min(1, 'country is a required field'),
});

export type Schema = z.infer<typeof schema>;

export const COUNTRIES = [
  { value: 1, label: 'Colombia' },
  { value: 2, label: 'Argentina' },
  { value: 3, label: 'Venezuela' },
];
