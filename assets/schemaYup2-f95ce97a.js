const schemaYup2 = "//@ts-nocheck\ntype Company = {\n  name: string;\n  contact: {\n    email: string;\n    phone: string;\n  };\n};\n\nconst companySchema: yup.Schema<Company> = yup.object({\n  name: yup.string().required(),\n  contact: yup.object({\n    email: yup.string().email().required(),\n    phone: yup.string().required(),\n  }),\n});\n";

export { schemaYup2 as default };
