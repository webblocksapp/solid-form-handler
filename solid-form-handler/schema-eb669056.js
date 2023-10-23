const e=`import { z } from 'zod';

export const schema = z.object({
  name: z.string().min(1, 'Required field'),
  email: z.string().email(),
});
`;export{e as default};
//# sourceMappingURL=schema-eb669056.js.map
