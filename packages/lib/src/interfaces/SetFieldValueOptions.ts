export type SetFieldValueOptions = {
  validate?: boolean;
  silentValidation?: boolean;
  touch?: boolean;
  dirty?: boolean;
  htmlElement?: HTMLElement;
  validateOn?: string[];
  delay?: number;
  forceValidate?: boolean;
  mapValue?: (value: any) => any;
};
