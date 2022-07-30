//@ts-nocheck
const formHandler = useFormHandler(userSchema);
console.log(formHandler.isFormInvalid()); //true

//Form filled with the expected schema data
formHandler.fillForm({ name: 'John', age: 28 });
console.log(formHandler.isFormInvalid()); //false
