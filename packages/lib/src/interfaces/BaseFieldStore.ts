export type BaseFieldStore = {
  props: {
    value?: any;
    id?: string;
    name?: string;
  };
  helpers: {
    errorMessage: string;
    error: boolean;
  };
};
