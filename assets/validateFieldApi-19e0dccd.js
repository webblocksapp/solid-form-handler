const validateFieldApi = "//@ts-nocheck\nfunction validateField(\n  path: string,\n  options?: {\n    silentValidation?: boolean;\n    validateOn?: string[];\n    force?: boolean;\n    delay?: number;\n  }\n): Promise<void>;\n";

export { validateFieldApi as default };
