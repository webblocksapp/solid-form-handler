//@ts-nocheck
import { useFormHandler } from 'solid-form-handler';
import { __VALIDATOR__Schema } from 'solid-form-handler/__VALIDATOR__';

const formHandler = useFormHandler(__VALIDATOR__Schema(userSchema));
