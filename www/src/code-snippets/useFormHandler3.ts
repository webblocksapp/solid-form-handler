//@ts-nocheck
import { useFormHandler } from 'solid-form-handler';
import { __VALIDATOR__Schema } from 'solid-form-handler/__VALIDATOR__';

const formHandler = useFormHandler(__VALIDATOR__Schema(userSchema), {
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
