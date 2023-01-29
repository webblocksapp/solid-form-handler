import * as yup from 'yup';

export type Schema = {
  gender: 'male' | 'female' | 'other';
};

export const schema: yup.SchemaOf<Schema> = yup.object().shape({
  gender: yup.mixed().required().oneOf(['male', 'female', 'other'], 'gender is a required field'),
});

export const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];
