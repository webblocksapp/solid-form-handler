const e=`import * as yup from 'yup';
import { Schema } from './types';

export const schema: yup.Schema<Schema> = yup.object({
  name: yup.string().required('Required field'),
  email: yup.string().email().required('Required field'),
});
`;export{e as default};
//# sourceMappingURL=schema-ebebbb09.js.map
