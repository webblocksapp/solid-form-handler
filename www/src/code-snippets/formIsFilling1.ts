//@ts-nocheck
formHandler.fillForm({ name: 'John', age: 28 });

createEffect(() => {
  console.log(formHandler.formIsFilling());
});
