import { CommonEvent, FieldProps, ValidateFieldOptions } from '@interfaces';

export interface CommonFieldProps extends FieldProps {
  onBlur?: CommonEvent;
  onBlurOptions?: ValidateFieldOptions;
}
