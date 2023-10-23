const e=`import * as yup from 'yup';
import { Schema } from './types';

export const schema: yup.Schema<Schema> = yup.object({
  name: yup.string().required('Required field'),
  email: yup
    .string()
    .email()
    .required('Required field')
    .test('emailExists', (value, context) => {
      return new Promise((res, rej) => {
        setTimeout(() => {
          if (value !== 'test@mail.com') {
            res(true);
          } else {
            rej(
              context.createError({ message: \`Email \${value} already exists.\` })
            );
          }
        }, 200);
      });
    }),
});
`;export{e as default};
