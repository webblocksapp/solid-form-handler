//@ts-nocheck
const formHandler = useFormHandler(userSchema);
formHandler.fillForm({ name: 'John', age: 28 });
console.log(formHandler.formData());
/**
 * -- Output: --
 * {name: 'John', age: 28}
 */