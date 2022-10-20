//@ts-nocheck
const formHandler = useFormHandler(yupSchema(userSchema));
formHandler.fillForm({ name: 'John', age: 28 });

createEffect(() => {
  console.log(formHandler.formIsFilling());
});
