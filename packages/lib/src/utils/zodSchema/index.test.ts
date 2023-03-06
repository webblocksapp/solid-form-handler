import { ROOT_KEY } from '@constants';
import { ValidationError, zodSchema } from '@utils';
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
        referral: z.object({ name: z.string() }),
      })
    );
    expect(validationSchema.getFieldDataType('name')).toBe('string');
    expect(validationSchema.getFieldDataType('age')).toBe('number');
    expect(validationSchema.getFieldDataType('contacts')).toBe('array');
    expect(validationSchema.getFieldDataType('contacts.0.name')).toBe('string');
    expect(validationSchema.getFieldDataType('contacts.1.name')).toBe('string');
    expect(validationSchema.getFieldDataType('contacts.0.age')).toBe('number');
    expect(validationSchema.getFieldDataType('contacts.1.age')).toBe('number');
    expect(validationSchema.getFieldDataType('referral.name')).toBe('string');
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
    let result: unknown;

    try {
      await validationSchema.validateAt('name', data);
    } catch (error) {
      result = error;
    }

    expect(result).toMatchObject({ path: 'name', message: 'String must contain at least 1 character(s)' });

    try {
      await validationSchema.validateAt('age', data);
    } catch (error) {
      result = error;
    }

    expect(result).toMatchObject({ path: 'age', message: 'Number must be greater than or equal to 1' });
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
    let result: unknown;

    try {
      await validationSchema.validateAt('password', data);
    } catch (error) {
      result = error;
    }

    expect(result).toMatchObject({ path: 'password', message: "Password doesn't match" });

    try {
      await validationSchema.validateAt('passwordConfirm', data);
    } catch (error) {
      result = error;
    }

    expect(result).toMatchObject({ path: 'passwordConfirm', message: 'passwordConfirm is a required field' });

    data = { password: 'ABCD', passwordConfirm: '' };

    try {
      await validationSchema.validateAt('password', data);
    } catch (error) {
      result = error;
    }

    expect(result).toMatchObject({ path: 'password', message: "password can't be greater than 3 characters" });
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
    let result: unknown;

    try {
      await validationSchema.validateAt('key1.key2.password', data);
    } catch (error) {
      result = error;
    }

    expect(result).toMatchObject({ path: 'key1.key2.password', message: "Password doesn't match" });

    try {
      await validationSchema.validateAt('key1.key2.passwordConfirm', data);
    } catch (error) {
      result = error;
    }

    expect(result).toMatchObject({
      path: 'key1.key2.passwordConfirm',
      message: 'passwordConfirm is a required field',
    });
  });

  it('validateAt CASE-4', async () => {
    const validationSchema = zodSchema(z.object({ key1: z.array(z.number()).min(2) }));

    let data = { key1: [1] };
    let result: unknown;

    try {
      await validationSchema.validateAt('key1', data);
    } catch (error) {
      result = error;
    }

    expect(result).toMatchObject({ path: 'key1', message: 'Array must contain at least 2 element(s)' });
  });

  it('validateAt CASE-5', async () => {
    const validationSchema = zodSchema(
      z.object({
        key1: z.string().min(1),
        key2: z.number().min(1),
        key3: z.object({ key4: z.string().min(1), key5: z.number().min(1) }),
      })
    );

    let data = { key1: '', key2: 0, key3: { key4: '', key5: 0 } };
    let result: ValidationError | undefined;

    try {
      await validationSchema.validateAt(ROOT_KEY, data);
    } catch (error) {
      if (error instanceof ValidationError) {
        result = error;
      }
    }

    expect(result).toMatchObject({ path: ROOT_KEY, message: 'Data is invalid' });
    expect(result?.children).toMatchObject([
      { message: 'String must contain at least 1 character(s)', path: 'key1' },
      { message: 'Number must be greater than or equal to 1', path: 'key2' },
      { message: 'String must contain at least 1 character(s)', path: 'key3.key4' },
      { message: 'Number must be greater than or equal to 1', path: 'key3.key5' },
    ]);
  });
});
