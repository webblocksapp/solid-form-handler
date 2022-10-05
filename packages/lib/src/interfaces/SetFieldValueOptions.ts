export type SetFieldValueOptions = {
  validate?: boolean;
  silentValidation?: boolean;
  touch?: boolean;
  dirty?: boolean;
  htmlElement?: HTMLElement;
  mapValue?: (value: any) => any;
};
