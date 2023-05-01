import * as yup from 'yup';
import { Schema } from './types';

export const schema: yup.Schema<Schema> = yup.object({
  step1: yup
    .object({
      firstName: yup.string().required(),
      secondName: yup.string().required(),
      gender: yup
        .mixed<Schema['step1']['gender']>()
        .required()
        .oneOf(['male', 'female', 'other']),
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
            email: yup.string().email().required(),
            phone: yup.string().optional(),
          })
        )
        .required()
        .min(1),
    })
    .required(),
});
