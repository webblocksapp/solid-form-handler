const e=`//@ts-nocheck
<input
  name="name"
  placeholder="Write your name"
  onInput={({ currentTarget: { name, value } }) =>
    formHandler.setFieldValue(name, value)
  }
></input>;
`;export{e as default};
//# sourceMappingURL=setFieldValue1-6883fc0e.js.map