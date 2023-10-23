const e=`//@ts-nocheck
const userSchema = z.object({
  name: z.string().min(1, 'name is required'),
  age: z.coerce.number().min(1, 'age is required'),
});
`;export{e as default};
//# sourceMappingURL=schemaZod1-a7b86214.js.map
