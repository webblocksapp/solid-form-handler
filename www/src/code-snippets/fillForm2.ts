//@ts-nocheck
const formHandler = useFormHandler(userSchema);
formHandler.fillForm({ age: 28 });
console.log(formHandler.formData());
/**
 * -- Output: --
 * {name: '', age: 28}
 */