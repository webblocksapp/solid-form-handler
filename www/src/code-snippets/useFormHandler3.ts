//@ts-nocheck
import { useFormHandler, yupSchema } from 'solid-form-handler';

const formHandler = useFormHandler(yupSchema(userSchema), {
  //Time given in milliseconds.
  delay: 1000,
});

/**
 * Value is set immediately but the validation will be
 * debounced by 1 second (1000 milliseconds)
 */
formHandler.setFieldValue('name', 'John');

//Validation also will be debounced.
formHandler.validateField('name');
