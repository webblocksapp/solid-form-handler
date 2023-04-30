import * as yup from 'yup';
import { yupSchema, zodSchema } from '@adapters';
import { z } from 'zod';

const _ySchema: yup.Schema<{
  isAdult: boolean;
  email?: string;
}> = yup.object({
  isAdult: yup.boolean().required(),
  email: yup.string().when('isAdult', { is: true, then: (schema) => schema.required() }),
});

export const ySchema = yupSchema(_ySchema);
export const zSchema = zodSchema(
  z
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
    })
);
