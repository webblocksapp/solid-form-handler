const schema = "import { z } from 'zod';\n\nexport const userSchema = z.object({\n  name: z.string().min(1, 'Required field'),\n  email: z.string().email('Invalid email'),\n  country: z.number().min(1, 'Country is required'),\n  favoriteFoods: z.array(z.number()).min(2),\n  gender: z\n    .string()\n    .refine((value) =>\n      ['male', 'female', 'other'].some((item) => item === value)\n    ),\n  subscribed: z.boolean(),\n});\n";

export { schema as default };
