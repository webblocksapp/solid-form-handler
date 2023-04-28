import * as yup from 'yup';
import { yupSchema, zodSchema } from '@adapters';
import { z } from 'zod';

const _ySchema: yup.SchemaOf<{
  document?: File;
}> = yup.object().shape({
  document: yup
    .mixed<File>()
    .test({
      name: 'fileRequired',
      message: 'File is required',
      test: (value) => (value ? true : false),
    })
    .test({
      name: 'fileSize',
      message: 'File exceeds 100kb',
      test: (value) => {
        const size = value?.size || 0;
        return size <= 200000 ? true : false;
      },
    }),
});

export const ySchema = yupSchema(_ySchema);
export const zSchema = zodSchema(
  z.object({
    document: z
      .custom<File>()
      .refine((value) => value, { message: 'File is required' })
      .refine(
        (value) => {
          const size = value?.size || 0;
          return size <= 200000 ? true : false;
        },
        { message: 'File exceeds 100kb' }
      ),
  })
);
