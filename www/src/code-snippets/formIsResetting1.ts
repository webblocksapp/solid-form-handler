//@ts-nocheck
const formHandler = useFormHandler(yupSchema(userSchema));
formHandler.resetForm();

createEffect(() => {
  console.log(formHandler.formIsResetting());
});
