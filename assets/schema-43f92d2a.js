const schema = "import { z } from 'zod';\n\nexport const schema = z.object({\n  name: z.string().min(1, 'Required field'),\n  email: z\n    .string()\n    .email()\n    .refine(async (value) => {\n      return new Promise((res) => {\n        setTimeout(() => res(value !== 'test@mail.com'), 200);\n      });\n    }, 'Email test@mail.com already exists'),\n});\n";

export { schema as default };
