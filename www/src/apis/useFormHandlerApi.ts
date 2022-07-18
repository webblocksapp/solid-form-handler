//@ts-nocheck
import { useFormHandler, FormHandler } from 'solid-form-handler';

function useFormHandler<T>(yupSchema: SchemaOf<T, never>): FormHandler;
