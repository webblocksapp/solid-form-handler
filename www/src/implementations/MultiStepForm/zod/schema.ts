import { z } from 'zod';

export const schema = z.object({
  step1: z
    .object({
      firstName: z.string().min(1, 'firstName is required'),
      secondName: z.string().min(1, 'secondName is required'),
      gender: z
        .string()
        .refine((value) =>
          ['male', 'female', 'other'].some((item) => item === value)
        ),
    })
    .required(),
  step2: z
    .object({
      university: z.coerce.number().min(1),
      profession: z.coerce.number().min(1),
      country: z.coerce.number().min(1),
    })
    .required(),
  step3: z
    .object({
      contact: z
        .array(
          z.object({
            email: z.string().email(),
            phone: z.string(),
          })
        )
        .min(1),
    })
    .required(),
});
