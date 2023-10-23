const schemaZod2 = "//@ts-nocheck\nconst companySchema = z.object({\n  name: z.string().min(1, 'name is required'),\n  contact: z.object({\n    email: z.string().email(),\n    phone: z.string().min(1, 'name is required'),\n  }),\n});\n";

export { schemaZod2 as default };
