//@ts-nocheck
formHandler.validateForm();

createEffect(() => {
  console.log(
    formHandler.isFieldValidating('name'),
    formHandler.isFieldValidating('age')
  );
});
