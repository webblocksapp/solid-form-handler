//@ts-nocheck
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
