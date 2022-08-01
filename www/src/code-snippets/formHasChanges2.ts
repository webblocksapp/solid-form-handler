//@ts-nocheck
console.log(formHandler.formHasChanges()); // false
formHandler.fillForm({ name: 'John', age: 28 });
console.log(formHandler.formHasChanges()); // true

//By setting back to the initial values
formHandler.fillForm({ name: '', age: '' });
console.log(formHandler.formHasChanges()); // false
