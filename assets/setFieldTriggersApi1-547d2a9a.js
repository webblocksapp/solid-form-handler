const r=`//@ts-nocheck
/**
 * Password field triggers passwordConfirm validation only if the user
 * has interacted with both fields.
 */
formHandler.setFieldTriggers('password', ['passwordConfirm']);

/**
 * passwordConfirm field triggers password validation only if the user
 * has interacted with both fields.
 */
formHandler.setFieldTriggers('passwordConfirm', ['password']);

formHandler.setFieldValue('password', 'ab'); //Won't trigger passwordConfirm validation
formHandler.setFieldValue('passwordConfirm', 'abc'); //Triggers password validation
formHandler.setFieldValue('password', 'ab'); //Triggers passwordConfirm validation
`;export{r as default};
