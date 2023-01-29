import { z } from 'zod';

export const schema = z.object({
  gender: z.enum(['male', 'female', 'other'], { errorMap: () => ({ message: 'gender is a required field' }) }),
});

export type Schema = z.infer<typeof schema>;
