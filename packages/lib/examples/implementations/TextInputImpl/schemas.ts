import * as yup from 'yup';
import { yupSchema, zodSchema } from '@adapters';
import { z } from 'zod';

const _ySchema: yup.Schema<{
  name: string;
  age: number;
}> = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().min(1),
});

export const ySchema = yupSchema(_ySchema);
export const zSchema = zodSchema(
  z.object({
    name: z.string().min(1, 'name is a required field'),
    age: z.number().min(1),
  })
);
