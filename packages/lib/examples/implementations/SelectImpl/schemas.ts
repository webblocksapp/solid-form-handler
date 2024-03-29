import * as yup from 'yup';
import { yupSchema, zodSchema } from '@adapters';
import { z } from 'zod';

const _ySchema: yup.Schema<{
  country: number;
}> = yup.object().shape({
  country: yup.number().required().typeError('Country is required'),
});

export const ySchema = yupSchema(_ySchema);
export const zSchema = zodSchema(
  z.object({
    country: z.coerce.number().min(1, 'Country is required'),
  })
);
