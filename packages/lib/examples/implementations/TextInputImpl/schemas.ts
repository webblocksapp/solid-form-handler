import * as yup from 'yup';
import { yupSchema, zodSchema } from '@utils';
import { z } from 'zod';

const _ySchema: yup.SchemaOf<{
  name: string;
}> = yup.object().shape({
  name: yup.string().required(),
});

export const ySchema = yupSchema(_ySchema);
export const zSchema = zodSchema(
  z.object({
    name: z.string().min(1, 'name is a required field'),
    email: z.string().email(),
  })
);
