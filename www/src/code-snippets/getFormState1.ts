//@ts-nocheck
const formHandler = useFormHandler(yupSchema(userSchema));
console.log(formHandler.getFormState());
/**
 * -- Output: --
 *   [
 *       {
 *         "name": {
 *           "__state": true,
 *           "isInvalid": true,
 *           "errorMessage": "",
 *           "initialValue": "",
 *           "touched": false,
 *           "dirty": false
 *         },
 *         "age": {
 *           "__state": true,
 *           "isInvalid": true,
 *           "errorMessage": "",
 *           "initialValue": "",
 *           "touched": false,
 *           "dirty": false
 *         }
 *       }
 *   ]
 */
