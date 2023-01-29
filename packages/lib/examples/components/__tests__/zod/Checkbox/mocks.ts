import { z } from 'zod';

export const schema = z.object({
  subscribed: z.literal(true, {
    errorMap: () => ({ message: 'subscribed is a required field' }),
  }),
  status: z.enum(['enabled', 'disabled']),
});

export type Schema = z.infer<typeof schema>;
