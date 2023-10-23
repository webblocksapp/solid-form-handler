const r=`//@ts-nocheck
await formHandler.validateForm();
console.log(formHandler.getFormErrors());
/**
 * -- Output: --
 * [
 *   { path: 'name', errorMessage: 'name is required' },
 *   { path: 'age', errorMessage: 'age is required' }
 * ]
 */
`;export{r as default};
//# sourceMappingURL=getFormErrors1-c8f3c4cd.js.map
