//@ts-nocheck
const formHandler = useFormHandler(userSchema);
const { formData } = formHandler;

console.log(formData().name); //''
console.log(formData().age); //''
console.log(formData());
/**
 * -- Output: --
 * {name: '', age: ''}
 */

formHandler.fillForm({ name: 'John', age: 28 });
console.log(formData().name); //John
console.log(formData().age); //28
console.log(formData());
/**
 * -- Output: --
 * {name: 'John', age: 28}
 */
