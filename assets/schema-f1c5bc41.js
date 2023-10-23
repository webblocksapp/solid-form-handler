const schema = "import * as yup from 'yup';\nimport { Schema } from './types';\n\nexport const schema: yup.Schema<Schema> = yup.object({\n  isAdult: yup.boolean().required(),\n  email: yup\n    .string()\n    .when('isAdult', { is: true, then: (schema) => schema.required() }),\n});\n";

export { schema as default };
