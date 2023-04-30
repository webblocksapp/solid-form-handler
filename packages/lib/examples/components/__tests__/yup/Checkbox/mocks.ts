import * as yup from 'yup';

export type Schema = {
  subscribed: boolean;
  status: 'enabled' | 'disabled';
};

export const schema: yup.Schema<Schema> = yup.object().shape({
  subscribed: yup.boolean().required().oneOf([true], 'subscribed is a required field'),
  status: yup.mixed<Schema['status']>().oneOf(['enabled', 'disabled']).required(),
});
