const schema = "import * as yup from 'yup';\nimport { Product } from './types';\n\nexport const productSchema: yup.Schema<Product[]> = yup\n  .array(\n    yup.object({\n      name: yup.string().required('Required field'),\n      quantity: yup\n        .number()\n        .required('Quantity is required')\n        .typeError('Write a valid quantity'),\n    })\n  )\n  .required();\n";

export { schema as default };
