//@ts-nocheck
const formHandler = useFormHandler(userSchema);
await formHandler.validateForm();
console.log(formHandler.getFormErrors());
/**
 * -- Output: --
 * [
 *   { path: 'name', errorMessage: 'name is required' },
 *   { path: 'age', errorMessage: 'age is required' }
 * ]
 */
