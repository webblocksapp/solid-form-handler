const types = "import { z } from 'zod';\nimport { schema } from './schema';\n\nexport type Schema = z.infer<typeof schema>;\n";

export { types as default };
