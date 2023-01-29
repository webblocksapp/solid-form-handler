import * as yup from 'yup';

export type Schema = {
  country: number;
};

export const schema: yup.SchemaOf<Schema> = yup.object().shape({
  country: yup.number().required().typeError('country is a required field'),
});

export const COUNTRIES = [
  { value: 1, label: 'Colombia' },
  { value: 2, label: 'Argentina' },
  { value: 3, label: 'Venezuela' },
];
