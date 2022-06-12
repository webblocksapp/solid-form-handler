import * as yup from 'yup';
export const getDefaultFromSchema = (schema: yup.AnySchema) => {
  return schema.getDefault();
};
