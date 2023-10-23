const schemaZod1 = "//@ts-nocheck\nconst userSchema = z.object({\n  name: z.string().min(1, 'name is required'),\n  age: z.coerce.number().min(1, 'age is required'),\n});\n";

export { schemaZod1 as default };
