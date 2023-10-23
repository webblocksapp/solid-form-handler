const schema = "import * as yup from 'yup';\nimport { Schema } from './types';\n\nexport const schema: yup.Schema<Schema> = yup.object({\n  name: yup.string().required('Required field'),\n  email: yup\n    .string()\n    .email()\n    .required('Required field')\n    .test('emailExists', (value, context) => {\n      return new Promise((res, rej) => {\n        setTimeout(() => {\n          if (value !== 'test@mail.com') {\n            res(true);\n          } else {\n            rej(\n              context.createError({ message: `Email ${value} already exists.` })\n            );\n          }\n        }, 200);\n      });\n    }),\n});\n";

export { schema as default };
