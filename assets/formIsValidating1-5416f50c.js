const n=`//@ts-nocheck
formHandler.validateForm();

createEffect(() => {
  console.log(formHandler.formIsValidating());
});
`;export{n as default};
