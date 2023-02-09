//@ts-nocheck
formHandler.validateForm();

createEffect(() => {
  console.log(formHandler.formIsValidating());
});
