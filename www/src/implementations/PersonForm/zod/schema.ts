import { z } from 'zod';

export const personSchema = z.object({
  name: z.string().min(1),
  age: z.coerce.number().min(1, 'number is a required field'),
  contact: z.object({
    email: z.string().email(),
    phone: z.string().min(1, 'phone is required'),
    address: z.string().min(1, 'address is required'),
  }),
});
