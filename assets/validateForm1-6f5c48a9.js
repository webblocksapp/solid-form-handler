const n=`//@ts-nocheck
try {
  await formHandler.validateForm();
} catch (error) {
  if (error instanceof FormErrorsException) {
    console.log(error);
    /**
     * -- Output: --
     * [
     *  {
     *    path: 'name',
     *    message: 'name is a required field'
     *  },
     *  {
     *    path: 'age',
     *    message: 'age is a required field'
     *  },
     * ]
     */
  }
}
`;export{n as default};
//# sourceMappingURL=validateForm1-6f5c48a9.js.map
