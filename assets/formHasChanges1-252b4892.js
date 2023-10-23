const e=`//@ts-nocheck
console.log(formHandler.formHasChanges()); // false
formHandler.setFieldValue('name', 'John');
console.log(formHandler.formHasChanges()); // true

//By setting back to the initial value of name
formHandler.setFieldValue('name', '');
console.log(formHandler.formHasChanges()); // false
`;export{e as default};
//# sourceMappingURL=formHasChanges1-252b4892.js.map
