const e=`import { z } from 'zod';

export const schema = z.object({
  name: z.string().min(1, 'Required field'),
  email: z
    .string()
    .email()
    .refine(async (value) => {
      return new Promise((res) => {
        setTimeout(() => res(value !== 'test@mail.com'), 200);
      });
    }, 'Email test@mail.com already exists'),
});
`;export{e as default};
//# sourceMappingURL=schema-d334c4c1.js.map