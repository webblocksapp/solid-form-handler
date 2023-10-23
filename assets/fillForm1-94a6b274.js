const n=`//@ts-nocheck
const formHandler = useFormHandler(__VALIDATOR__Schema(userSchema));
formHandler.fillForm({ name: 'John', age: 28 });
console.log(formHandler.formData());
/**
 * -- Output: --
 * {name: 'John', age: 28}
 */
`;export{n as default};
