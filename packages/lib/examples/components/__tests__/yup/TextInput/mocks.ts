import * as yup from 'yup';

export type Schema = {
  name: string;
};

export const schema: yup.SchemaOf<Schema> = yup.object().shape({
  name: yup.string().required(),
});
