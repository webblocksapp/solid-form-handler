const schemaYup1 = "//@ts-nocheck\ntype User = {\n  name: string;\n  age: string;\n};\n\nconst userSchema: yup.Schema<User> = yup.object({\n  name: yup.string().required(),\n  age: yup.number().required(),\n});\n";

export { schemaYup1 as default };
