const formHasChanges2 = "//@ts-nocheck\nconsole.log(formHandler.formHasChanges()); // false\nformHandler.fillForm({ name: 'John', age: 28 });\nconsole.log(formHandler.formHasChanges()); // true\n\n//By setting back to the initial values\nformHandler.fillForm({ name: '', age: '' });\nconsole.log(formHandler.formHasChanges()); // false\n";

export { formHasChanges2 as default };
