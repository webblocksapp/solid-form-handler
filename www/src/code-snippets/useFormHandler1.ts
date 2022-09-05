//@ts-nocheck
import { useFormHandler, yupSchema } from 'solid-form-handler';

const formHandler = useFormHandler(yupSchema(userSchema));
