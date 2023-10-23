const e=`import * as yup from 'yup';
import { Schema } from './types';

export const schema: yup.Schema<Schema> = yup.object({
  password: yup
    .string()
    .required()
    .test({
      name: 'matches',
      test: (value, context) => {
        return value == context.parent['passwordConfirm'];
      },
      message: "Password doesn't match",
    }),
  passwordConfirm: yup
    .string()
    .required()
    .test({
      name: 'matches',
      test: (value, context) => {
        return value == context.parent['password'];
      },
      message: "Password doesn't match",
    }),
});
`;export{e as default};
//# sourceMappingURL=schema-ab647777.js.map
