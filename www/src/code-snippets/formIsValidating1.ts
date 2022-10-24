//@ts-nocheck
const formHandler = useFormHandler(yupSchema(userSchema));
formHandler.validateForm();

createEffect(() => {
  console.log(formHandler.formIsValidating());
});
