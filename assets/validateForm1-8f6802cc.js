const validateForm1 = "//@ts-nocheck\ntry {\n  await formHandler.validateForm();\n} catch (error) {\n  if (error instanceof FormErrorsException) {\n    console.log(error);\n    /**\n     * -- Output: --\n     * [\n     *  {\n     *    path: 'name',\n     *    message: 'name is a required field'\n     *  },\n     *  {\n     *    path: 'age',\n     *    message: 'age is a required field'\n     *  },\n     * ]\n     */\n  }\n}\n";

export { validateForm1 as default };
