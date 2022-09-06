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
    const validationSchema = yupSchema(yup.object({ name: yup.string(), age: yup.string() }));
    expect(validationSchema.buildDefault()).toMatchObject({ name: '', age: '' });
  });

  it('buildDefault CASE-4', () => {
    const validationSchema = yupSchema(yup.array(yup.object({ name: yup.string(), age: yup.string() })));
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
        hasHouse: yup
          .boolean()
          .required()
          .transform((value) => Boolean(value))
          .default(false),
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
});