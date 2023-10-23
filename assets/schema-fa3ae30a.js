const schema = "import { z } from 'zod';\n\nexport const productSchema = z.array(\n  z.object({\n    name: z.string().min(1, 'Required field'),\n    quantity: z.coerce.number().min(1, 'Quantity is required'),\n  })\n);\n";

export { schema as default };
