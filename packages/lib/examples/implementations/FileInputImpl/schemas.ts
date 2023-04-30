import * as yup from 'yup';
import { yupSchema, zodSchema } from '@adapters';
import { z } from 'zod';

const isRequired = (value?: File) => (value ? true : false);
const fileSize = (value?: File) => {
  const size = value?.size || 0;
  return size <= 200000 ? true : false;
};

const _ySchema: yup.Schema<{
  document: File;
  documents: File[];
}> = yup.object().shape({
  document: yup
    .mixed<File>()
    .required()
    .test({
      name: 'fileSize',
      message: 'File exceeds 200kb',
      test: fileSize,
    })
    .test({ name: 'isRequired', message: 'File is required', test: isRequired }),
  documents: yup
    .array(
      yup
        .mixed<File>()
        .test({
          name: 'fileSizes',
          message: 'One File exceeds 200kb',
          test: fileSize,
        })
        .required()
    )
    .required()
    .min(2),
});

export const ySchema = yupSchema(_ySchema);
export const zSchema = zodSchema(
  z.object({
    document: z
      .custom<File>()
      .refine(isRequired, { message: 'File is required' })
      .refine(fileSize, { message: 'File exceeds 100kb' }),
    documents: z
      .array(
        z
          .custom<File>()
          .refine(isRequired, { message: 'File is required' })
          .refine(fileSize, { message: 'File exceeds 100kb' })
      )
      .min(2),
  })
);
