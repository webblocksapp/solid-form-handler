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

  it('buildDefault CASE-2', () => {
    const validationSchema = zodSchema(z.array(z.object({ name: z.string(), emails: z.array(z.string()) })));
    expect(validationSchema.buildDefault()).toMatchObject([{ name: '', emails: [] }]);
  });

  it('buildDefault CASE-3', () => {
    const validationSchema = zodSchema(z.object({ name: z.string(), age: z.number() }));
    expect(validationSchema.buildDefault()).toMatchObject({ name: '', age: '' });
  });

  it('buildDefault CASE-4', () => {
    const validationSchema = zodSchema(z.array(z.object({ name: z.string(), age: z.number() })));
    expect(validationSchema.buildDefault()).toMatchObject([{ name: '', age: '' }]);
  });

  it('buildDefault CASE-5', () => {
    const validationSchema = zodSchema(
      z.object({
        name: z.string().min(1),
        age: z.number(),
        contact: z.object({
          email: z.string().email(),
          phone: z.string().min(10),
        }),
        hasHouse: z.boolean(),
        houseAddress: z.string().optional(),
      })
    );
    expect(validationSchema.buildDefault()).toMatchObject({
      name: '',
      age: '',
      contact: { email: '', phone: '' },
      hasHouse: false,
      houseAddress: '',
    });
  });

  it('buildDefault CASE-6', () => {
    const validationSchema = zodSchema(
      z.object({
        favoriteFoods: z.array(z.number()).min(2),
      })
    );
    expect(validationSchema.buildDefault()).toMatchObject({
      favoriteFoods: [],
    });
  });

  it('buildDefault CASE-7', () => {
    const validationSchema = zodSchema(
      z.object({
        key1: z.number(),
        key2: z.boolean(),
        key3: z.string(),
        key4: z.array(z.string()),
        key5: z.array(
          z.object({
            key51: z.string(),
            key52: z.number(),
            key53: z.boolean(),
          })
        ),
      })
    );
    expect(validationSchema.buildDefault()).toMatchObject({
      key1: '',
      key2: false,
      key3: '',
      key4: [],
      key5: [
        {
          key51: '',
          key52: '',
          key53: false,
        },
      ],
    });
  });

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

  it('buildDefault CASE-9', () => {
    const validationSchema = zodSchema(
      z.object({
        jsFramework: z.string().refine((value) => ['solidjs', 'reactjs', 'angular'].some((item) => item === value)),
      })
    );

    expect(validationSchema.buildDefault()).toMatchObject({
      jsFramework: '',
    });
  });

  it('isFieldFromSchema', () => {
    const validationSchema = zodSchema(
      z.object({
        name: z.string(),
        age: z.number(),
        contacts: z.array(z.object({ name: z.string(), age: z.number() })),
      })
    );
    expect(validationSchema.isFieldFromSchema('name')).toBe(true);
    expect(validationSchema.isFieldFromSchema('age')).toBe(true);
    expect(validationSchema.isFieldFromSchema('contacts')).toBe(true);
    expect(validationSchema.isFieldFromSchema('contacts.0.name')).toBe(true);
    expect(validationSchema.isFieldFromSchema('contacts.1.name')).toBe(true);
    expect(validationSchema.isFieldFromSchema('contacts.0.age')).toBe(true);
    expect(validationSchema.isFieldFromSchema('contacts.1.age')).toBe(true);
    expect(validationSchema.isFieldFromSchema('fake.1.age')).toBe(false);
  });

  it('validateAt CASE-1', async () => {
    const validationSchema = zodSchema(
      z.object({
        name: z.string().min(1),
        age: z.number().min(1),
      })
    );

    const data = { name: '', age: 0 };

    try {
      await validationSchema.validateAt('name', data);
    } catch (error) {
      expect(error).toMatchObject({ path: 'name', message: 'String must contain at least 1 character(s)' });
    }

    try {
      await validationSchema.validateAt('age', data);
    } catch (error) {
      expect(error).toMatchObject({ path: 'age', message: 'Number must be greater than or equal to 1' });
    }
  });

  it('validateAt CASE-2', async () => {
    const validationSchema = zodSchema(
      z
        .object({
          password: z
            .string()
            .min(1, 'password is a required field')
            .refine((value) => value.length <= 3, "password can't be greater than 3 characters"),
          passwordConfirm: z.string().min(1, 'passwordConfirm is a required field'),
        })
        .superRefine((data, ctx) => {
          if (data.password !== data.passwordConfirm) {
            ctx.addIssue({
              code: 'custom',
              path: ['password', 'passwordConfirm'],
              message: "Password doesn't match",
            });
          }
        })
    );

    let data = { password: 'A', passwordConfirm: '' };

    try {
      await validationSchema.validateAt('password', data);
    } catch (error) {
      expect(error).toMatchObject({ path: 'password', message: "Password doesn't match" });
    }

    try {
      await validationSchema.validateAt('passwordConfirm', data);
    } catch (error) {
      expect(error).toMatchObject({ path: 'passwordConfirm', message: 'passwordConfirm is a required field' });
    }

    data = { password: 'ABCD', passwordConfirm: '' };

    try {
      await validationSchema.validateAt('password', data);
    } catch (error) {
      expect(error).toMatchObject({ path: 'password', message: "password can't be greater than 3 characters" });
    }
  });

  it('validateAt CASE-3', async () => {
    const validationSchema = zodSchema(
      z.object({
        key1: z.object({
          key2: z
            .object({
              password: z
                .string()
                .min(1, 'password is a required field')
                .refine((value) => value.length <= 3, "password can't be greater than 3 characters"),
              passwordConfirm: z.string().min(1, 'passwordConfirm is a required field'),
            })
            .superRefine((data, ctx) => {
              if (data.password !== data.passwordConfirm) {
                ctx.addIssue({
                  code: 'custom',
                  path: ['password', 'passwordConfirm'],
                  message: "Password doesn't match",
                });
              }
            }),
        }),
      })
    );

    let data = { key1: { key2: { password: 'A', passwordConfirm: '' } } };

    try {
      await validationSchema.validateAt('key1.key2.password', data);
    } catch (error) {
      expect(error).toMatchObject({ path: 'key1.key2.password', message: "Password doesn't match" });
    }

    try {
      await validationSchema.validateAt('key1.key2.passwordConfirm', data);
    } catch (error) {
      expect(error).toMatchObject({
        path: 'key1.key2.passwordConfirm',
        message: 'passwordConfirm is a required field',
      });
    }
  });
});
