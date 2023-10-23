const setFieldTriggersApi1 = "//@ts-nocheck\n/**\n * Password field triggers passwordConfirm validation only if the user\n * has interacted with both fields.\n */\nformHandler.setFieldTriggers('password', ['passwordConfirm']);\n\n/**\n * passwordConfirm field triggers password validation only if the user\n * has interacted with both fields.\n */\nformHandler.setFieldTriggers('passwordConfirm', ['password']);\n\nformHandler.setFieldValue('password', 'ab'); //Won't trigger passwordConfirm validation\nformHandler.setFieldValue('passwordConfirm', 'abc'); //Triggers password validation\nformHandler.setFieldValue('password', 'ab'); //Triggers passwordConfirm validation\n";

export { setFieldTriggersApi1 as default };
