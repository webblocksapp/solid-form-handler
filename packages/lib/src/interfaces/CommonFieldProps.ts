import { CommonEvent, FieldProps, FieldStore, ValidateFieldOptions } from '@interfaces';
import { JSXElement } from 'solid-js';

export interface CommonFieldProps extends FieldProps {
  onBlur?: CommonEvent;
  onBlurOptions?: ValidateFieldOptions;
  children: (field: FieldStore) => JSXElement;
}
