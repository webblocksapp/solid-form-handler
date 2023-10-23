const e=`//@ts-nocheck
<input
  name="name"
  placeholder="Write your name"
  oninput={({ currentTarget: { name, value } }) =>
    formHandler.setFieldValue(name, value)
  }
  onBlur={({ currentTarget: { name } }) => {
    formHandler.validateField(name);
    formHandler.touchField(name); //Marks the field as touched
  }}
></input>;
`;export{e as default};
