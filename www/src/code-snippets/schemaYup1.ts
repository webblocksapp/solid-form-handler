//@ts-nocheck
type User = {
  name: string;
  age: string;
};

const userSchema: yup.SchemaOf<User> = yup.object({
  name: yup.string().required(),
  age: yup.number().required(),
});
