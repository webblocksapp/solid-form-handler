const context = "import { FormHandler } from 'solid-form-handler';\nimport { createContext, useContext } from 'solid-js';\nimport { Schema } from './types';\n\nexport const FormContext = createContext(\n  {} as {\n    formHandler: FormHandler<Schema>;\n  }\n);\n\nexport const useFormContext = () => useContext(FormContext);\n";

export { context as default };
