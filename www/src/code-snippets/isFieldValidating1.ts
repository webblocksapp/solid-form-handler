//@ts-nocheck
const formHandler = useFormHandler(yupSchema(userSchema));
formHandler.validateForm();

createEffect(() => {
  console.log(
    formHandler.isFieldValidating('name'),
    formHandler.isFieldValidating('age')
  );
});
