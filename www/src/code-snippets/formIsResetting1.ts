//@ts-nocheck
formHandler.resetForm();

createEffect(() => {
  console.log(formHandler.formIsResetting());
});
