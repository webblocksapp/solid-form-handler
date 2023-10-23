const e=`//@ts-nocheck
type User = {
  name: string;
  age: string;
};

const userSchema: yup.Schema<User> = yup.object({
  name: yup.string().required(),
  age: yup.number().required(),
});
`;export{e as default};
//# sourceMappingURL=schemaYup1-53e94a89.js.map
