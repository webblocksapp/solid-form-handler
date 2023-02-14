import { z } from 'zod';

export const schema = z.object({
  name: z.string().min(1, 'name is a required field'),
});

export type Schema = z.infer<typeof schema>;
