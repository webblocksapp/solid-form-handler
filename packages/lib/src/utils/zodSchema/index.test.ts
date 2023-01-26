import { zodSchema } from '@utils';
import { z } from 'zod';

describe('zodSchema', () => {
  it('buildDefault CASE-1', () => {
    const validationSchema = zodSchema(
      z.object({
        name: z.string(),
        age: z.number(),
        contacts: z.array(z.object({ name: z.string(), age: z.string() })),
      })
    );

    expect(validationSchema.buildDefault()).toMatchObject({ name: '', age: '', contacts: [{ name: '', age: '' }] });
  });
});
