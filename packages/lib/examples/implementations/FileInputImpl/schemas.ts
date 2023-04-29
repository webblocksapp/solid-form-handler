import * as yup from 'yup';
import { yupSchema, zodSchema } from '@adapters';
import { z } from 'zod';

const fileIsRequired = (value?: File) => (value ? true : false);
const fileSize = (value?: File) => {
  const size = value?.size || 0;
  return size <= 200000 ? true : false;
};
const filesAreRequired = (value?: File[]) => {
  const numberOfFiles = value?.length || 0;
  return numberOfFiles >= 2 ? true : false;
};
const fileSizes = (value?: File[]) => {
  value?.forEach?.((item) => {
    return fileSize(item);
  });
  return true;
};

const _ySchema: yup.SchemaOf<{
  document?: File;
}> = yup.object().shape({
  document: yup
    .mixed<File>()
    .test({
      name: 'fileIsRequired',
      message: 'File is required',
      test: fileIsRequired,
    })
    .test({
      name: 'fileSize',
      message: 'File exceeds 200kb',
      test: fileSize,
    }),
  documents: yup
    .mixed<File[]>()
    .test({
      name: 'filesAreRequired',
      message: 'Min 2 files are required',
      test: filesAreRequired,
    })
    .test({
      name: 'fileSizes',
      message: 'One File exceeds 200kb',
      test: fileSizes,
    })
    .default([]),
});

export const ySchema = yupSchema(_ySchema);
export const zSchema = zodSchema(
  z.object({
    document: z
      .custom<File>()
      .refine(fileIsRequired, { message: 'File is required' })
      .refine(fileSize, { message: 'File exceeds 100kb' }),
    documents: z
      .custom<File[]>()
      .refine(filesAreRequired, { message: 'Min 2 files are required' })
      .refine(fileSizes, { message: 'One File exceeds 200kb' }),
  })
);
