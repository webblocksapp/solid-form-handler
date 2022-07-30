//@ts-nocheck
<input
  name="name"
  placeholder="Write your name"
  oninput={({ currentTarget: { name, value } }) =>
    formHandler.setFieldValue(name, value)
  }
></input>;
