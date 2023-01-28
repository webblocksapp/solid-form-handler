import { z } from 'zod';

export const personSchema = z.object({
  name: z.string().min(1, 'name is a required field'),
  age: z.coerce.number().gte(1, 'age is a required field'),
});

export const contactSchema = z.object({
  contact: personSchema,
});

export const personsSchema = z.array(personSchema);

export const referralsSchema = z.object({
  hostName: z.string().min(1, 'hostName is a required field'),
  referrals: z.array(personSchema),
});

export const triggersSchema = z
  .object({
    password: z.string().min(1, 'password is a required field'),
    passwordConfirm: z.string().min(1, 'passwordConfirm is a required field'),
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
