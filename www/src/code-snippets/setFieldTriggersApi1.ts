//@ts-nocheck
import { useFormHandler, yupSchema } from 'solid-form-handler';

const formHandler = useFormHandler(yupSchema(schema));
/**
 * Password field triggers passwordConfirm validation only if the user
 * has interacted with both fields.
 */
formHandler.setFieldTriggersApi('password', ['passwordConfirm']);

/**
 * passwordConfirm field triggers password validation only if the user
 * has interacted with both fields.
 */
formHandler.setFieldTriggersApi('passwordConfirm', ['password']);

formHandler.setFieldValue('password', 'ab'); //Won't trigger passwordConfirm validation
formHandler.setFieldValue('passwordConfirm', 'abc'); //Triggers password validation
formHandler.setFieldValue('password', 'ab'); //Triggers passwordConfirm validation
