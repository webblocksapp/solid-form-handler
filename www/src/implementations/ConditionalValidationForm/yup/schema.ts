import * as yup from 'yup';
import { Schema } from './types';

export const schema: yup.Schema<Schema> = yup.object({
  isAdult: yup.boolean().required(),
  email: yup
    .string()
    .when('isAdult', { is: true, then: (schema) => schema.required() }),
});
