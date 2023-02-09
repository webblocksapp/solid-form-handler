import { z } from 'zod';

export const schema = z
  .object({
    password: z.string().min(1, 'Password is required'),
    passwordConfirm: z.string().min(1, 'Password confirm is required'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: 'custom',
        path: ['password', 'passwordConfirm'],
        message: "Password doesn't match",
      });
    }
  });
