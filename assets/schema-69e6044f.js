const schema = "import * as yup from 'yup';\nimport { Schema } from './types';\n\nexport const schema: yup.Schema<Schema> = yup.object({\n  name: yup.string().required('Required field'),\n  email: yup.string().email().required('Required field'),\n});\n";

export { schema as default };
