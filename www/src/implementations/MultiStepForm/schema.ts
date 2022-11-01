import * as yup from 'yup';
import { Schema } from './types';

export const schema: yup.SchemaOf<Schema> = yup.object({
  step1: yup
    .object({
      firstName: yup.string().required(),
      secondName: yup.string().required(),
      gender: yup.mixed().required().oneOf(['male', 'female', 'other']),
    })
    .required(),
  step2: yup
    .object({
      university: yup.number().required(),
      profession: yup.number().required(),
      country: yup.number().required(),
    })
    .required(),
  step3: yup
    .object({
      contact: yup
        .array(
          yup.object({
            email: yup.string().required(),
            phone: yup.string().optional(),
          })
        )
        .required()
        .min(1),
    })
    .required(),
});
