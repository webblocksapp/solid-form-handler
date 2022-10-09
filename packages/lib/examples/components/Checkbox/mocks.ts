import * as yup from 'yup';

export type Schema = {
  subscribed: boolean;
};

export const schema: yup.SchemaOf<Schema> = yup.object().shape({
  subscribed: yup.boolean().required().oneOf([true], 'subscribed is a required field'),
});
