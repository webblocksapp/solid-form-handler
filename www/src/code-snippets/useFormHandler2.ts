//@ts-nocheck
import { useFormHandler, yupSchema } from 'solid-form-handler';

const formHandler = useFormHandler(yupSchema(userSchema), {
  //Events are an array of strings so you can set custom event types.
  validateOn: ['input'],
});

//Value will be set and validated if matches input event
formHandler.setFieldValue('name', 'John', { validateOn: ['input'] });

//If no event given, it will be set and validated
formHandler.setFieldValue('name', 'Laura');

/**
 * Value will be set but wont be validated on blur event because the form handler
 * is configured for just checking the input event.
 */
formHandler.setFieldValue('name', 'John', { validateOn: ['blur'] });
