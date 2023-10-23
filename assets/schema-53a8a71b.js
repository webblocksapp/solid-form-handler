const schema = "import * as yup from 'yup';\nimport { Person } from './types';\n\nexport const personSchema: yup.Schema<Person> = yup.object({\n  name: yup.string().required(),\n  age: yup.number().required().typeError('number is a required field'),\n  contact: yup.object({\n    email: yup.string().required(),\n    phone: yup.string().required(),\n    address: yup.string().required(),\n  }),\n});\n";

export { schema as default };
