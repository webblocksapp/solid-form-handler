//@ts-nocheck
type User = {
  name: string;
  age: string;
};

const userSchema: yup.Schema<User> = yup.object({
  name: yup.string().required(),
  age: yup.number().required(),
});
