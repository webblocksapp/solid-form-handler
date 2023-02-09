import { z } from 'zod';

export const schema = z
  .object({
    isAdult: z.boolean(),
    email: z.string().email().optional().or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    if (data.isAdult === true && data?.email?.length === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['email'],
        message: 'Email is required',
      });
    }
  });
