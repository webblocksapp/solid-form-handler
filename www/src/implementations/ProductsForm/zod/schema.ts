import { z } from 'zod';

export const productSchema = z.array(
  z.object({
    name: z.string().min(1, 'Required field'),
    quantity: z.coerce.number().min(1, 'Quantity is required'),
  })
);
