const schema = "import { z } from 'zod';\n\nexport const schema = z\n  .object({\n    isAdult: z.boolean(),\n    email: z.string().email().optional().or(z.literal('')),\n  })\n  .superRefine((data, ctx) => {\n    if (data.isAdult === true && data?.email?.length === 0) {\n      ctx.addIssue({\n        code: 'custom',\n        path: ['email'],\n        message: 'Email is required',\n      });\n    }\n  });\n";

export { schema as default };
