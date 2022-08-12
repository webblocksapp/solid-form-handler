//@ts-nocheck
<input
  name="name"
  placeholder="Write your name"
  onInput={({ currentTarget: { name, value } }) =>
    formHandler.setFieldValue(name, value)
  }
></input>;
