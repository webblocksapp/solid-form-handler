const schema = "import { z } from 'zod';\n\nexport const schema = z.object({\n  name: z.string().min(1, 'Required field'),\n  email: z.string().email(),\n});\n";

export { schema as default };
