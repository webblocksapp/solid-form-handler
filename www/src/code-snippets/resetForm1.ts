//@ts-nocheck
formHandler.fillForm({ name: 'John', age: 28 });
console.log(formHandler.formData());
/**
 * -- Output: --
 * {name: 'John', age: 28}
 */

formHandler.resetForm();
console.log(formHandler.formData());
/**
 * -- Output: --
 * {name: '', age: ''}
 */
