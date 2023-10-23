const schema = "import { z } from 'zod';\n\nexport const personSchema = z.object({\n  name: z.string().min(1),\n  age: z.coerce.number().min(1, 'number is a required field'),\n  contact: z.object({\n    email: z.string().email(),\n    phone: z.string().min(1, 'phone is required'),\n    address: z.string().min(1, 'address is required'),\n  }),\n});\n";

export { schema as default };
