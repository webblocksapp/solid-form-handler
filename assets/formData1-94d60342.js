const n=`//@ts-nocheck
const formHandler = useFormHandler(__VALIDATOR__Schema(userSchema));
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
`;export{n as default};
//# sourceMappingURL=formData1-94d60342.js.map
