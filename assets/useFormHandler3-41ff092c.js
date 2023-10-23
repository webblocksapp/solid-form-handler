const useFormHandler3 = "//@ts-nocheck\nimport { useFormHandler } from 'solid-form-handler';\nimport { __VALIDATOR__Schema } from 'solid-form-handler/__VALIDATOR__';\n\nconst formHandler = useFormHandler(__VALIDATOR__Schema(userSchema), {\n  //Time given in milliseconds.\n  delay: 1000,\n});\n\n/**\n * Value is set immediately but the validation will be\n * debounced by 1 second (1000 milliseconds)\n */\nformHandler.setFieldValue('name', 'John');\n\n//Validation also will be debounced.\nformHandler.validateField('name');\n";

export { useFormHandler3 as default };
