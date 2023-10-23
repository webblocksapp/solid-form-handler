const n=`//@ts-nocheck
formHandler.validateForm();

createEffect(() => {
  console.log(
    formHandler.isFieldValidating('name'),
    formHandler.isFieldValidating('age')
  );
});
`;export{n as default};
//# sourceMappingURL=isFieldValidating1-89d62ea4.js.map
