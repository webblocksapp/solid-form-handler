const e=`import * as yup from 'yup';
import { Person } from './types';

export const personSchema: yup.Schema<Person> = yup.object({
  name: yup.string().required(),
  age: yup.number().required().typeError('number is a required field'),
  contact: yup.object({
    email: yup.string().required(),
    phone: yup.string().required(),
    address: yup.string().required(),
  }),
});
`;export{e as default};
