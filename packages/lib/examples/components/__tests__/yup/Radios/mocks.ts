import * as yup from 'yup';

export type Schema = {
  gender: 'male' | 'female' | 'other';
};

export const schema: yup.Schema<Schema> = yup.object().shape({
  gender: yup
    .mixed<Schema['gender']>()
    .required()
    .oneOf(['male', 'female', 'other'], 'gender is a required field')
    .required(),
});

export const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];
