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
     *    errorMessage: 'name is a required field'
     *  },
     *  {
     *    path: 'age',
     *    errorMessage: 'age is a required field'
     *  },
     * ]
     */
  }
}
