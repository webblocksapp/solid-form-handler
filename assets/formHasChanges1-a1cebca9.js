const formHasChanges1 = "//@ts-nocheck\nconsole.log(formHandler.formHasChanges()); // false\nformHandler.setFieldValue('name', 'John');\nconsole.log(formHandler.formHasChanges()); // true\n\n//By setting back to the initial value of name\nformHandler.setFieldValue('name', '');\nconsole.log(formHandler.formHasChanges()); // false\n";

export { formHasChanges1 as default };
