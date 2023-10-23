const e=`import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Required field'),
  email: z.string().email('Invalid email'),
  country: z.number().min(1, 'Country is required'),
  favoriteFoods: z.array(z.number()).min(2),
  gender: z
    .string()
    .refine((value) =>
      ['male', 'female', 'other'].some((item) => item === value)
    ),
  subscribed: z.boolean(),
});
`;export{e as default};
