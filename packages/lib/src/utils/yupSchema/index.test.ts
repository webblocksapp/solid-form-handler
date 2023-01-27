import { yupSchema } from '@utils';
import * as yup from 'yup';

describe('yupSchema', () => {
  it('buildDefault CASE-1', () => {
    const validationSchema = yupSchema(
      yup.object({
        name: yup.string(),
        age: yup.number(),
        contacts: yup.array(yup.object({ name: yup.string(), age: yup.string() })),
      })
    );
    expect(validationSchema.buildDefault()).toMatchObject({ name: '', age: '', contacts: [{ name: '', age: '' }] });
  });

  it('buildDefault CASE-2', () => {
    const validationSchema = yupSchema(yup.array(yup.object({ name: yup.string(), emails: yup.array(yup.string()) })));
    expect(validationSchema.buildDefault()).toMatchObject([{ name: '', emails: [] }]);
  });

  it('buildDefault CASE-3', () => {
    const validationSchema = yupSchema(yup.object({ name: yup.string(), age: yup.number() }));
    expect(validationSchema.buildDefault()).toMatchObject({ name: '', age: '' });
  });

  it('buildDefault CASE-4', () => {
    const validationSchema = yupSchema(yup.array(yup.object({ name: yup.string(), age: yup.number() })));
    expect(validationSchema.buildDefault()).toMatchObject([{ name: '', age: '' }]);
  });

  it('buildDefault CASE-5', () => {
    const validationSchema = yupSchema(
      yup.object({
        name: yup.string().required(),
        age: yup.number().required().typeError('Age is required'),
        contact: yup.object({
          email: yup.string().required().email(),
          phone: yup.string().required(),
        }),
        hasHouse: yup.boolean().required(),
        houseAddress: yup.string().optional().when('hasHouse', { is: true, then: yup.string().required() }),
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
    const validationSchema = yupSchema(
      yup.object({
        favoriteFoods: yup.array(yup.number().required()).min(2),
      })
    );
    expect(validationSchema.buildDefault()).toMatchObject({
      favoriteFoods: [],
    });
  });

  it('buildDefault CASE-7', () => {
    const validationSchema = yupSchema(
      yup.object({
        key1: yup.number(),
        key2: yup.boolean(),
        key3: yup.string(),
        key4: yup.array(yup.string()),
        key5: yup.array(
          yup.object({
            key51: yup.string(),
            key52: yup.number(),
            key53: yup.boolean(),
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
    const validationSchema = yupSchema(
      yup.object({
        name: yup.string(),
        age: yup.number(),
        contacts: yup.array(yup.object({ name: yup.string(), age: yup.number() })),
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

  it('isFieldFromSchema', () => {
    const validationSchema = yupSchema(
      yup.object({
        name: yup.string(),
        age: yup.number(),
        contacts: yup.array(yup.object({ name: yup.string(), age: yup.number() })),
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

  it('validateAt', async () => {
    const validationSchema = yupSchema(
      yup.object({
        name: yup.string().min(1),
        age: yup.number().min(1),
      })
    );

    const data = { name: '', age: 0 };

    try {
      await validationSchema.validateAt('name', data);
    } catch (error) {
      expect(error).toMatchObject({ path: 'name', message: 'name must be at least 1 characters' });
    }

    try {
      await validationSchema.validateAt('age', data);
    } catch (error) {
      expect(error).toMatchObject({ path: 'age', message: 'age must be greater than or equal to 1' });
    }
  });
});
