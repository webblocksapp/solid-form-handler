//@ts-nocheck
import { useFormHandler } from 'solid-form-handler';

const formHandler = useFormHandler(userSchema);
const { formData } = formHandler;

formData().name; //John
formData().age; //28
