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

  //TODO more test cases

  it('buildDefault CASE-8', () => {
    const validationSchema = zodSchema(
      z.object({
        name: z.string(),
        age: z.number(),
        contacts: z.array(z.object({ name: z.string(), age: z.number() })),
      })
    );
    expect(validationSchema.getFieldDataType('name')).toBe('string');
    expect(validationSchema.getFieldDataType('age')).toBe('number');
    expect(validationSchema.getFieldDataType('contacts')).toBe('array');
    expect(validationSchema.getFieldDataType('contacts.0.name')).toBe('string');
    expect(validationSchema.getFieldDataType('contacts.1.name')).toBe('string');
    expect(validationSchema.getFieldDataType('contacts.0.age')).toBe('number');
    expect(validationSchema.getFieldDataType('contacts.1.age')).toBe('number');
  });
});
