import { buildDefault } from '@utils';
import * as yup from 'yup';

describe('buildDefault', () => {
  it('CASE-1', () => {
    const schema = yup.object({
      name: yup.string(),
      age: yup.number(),
      contacts: yup.array(yup.object({ name: yup.string(), age: yup.string() })),
    });
    expect(buildDefault(schema)).toMatchObject({ name: '', age: '', contacts: [{ name: '', age: '' }] });
  });

  it('CASE-2', () => {
    const schema = yup.array(yup.object({ name: yup.string(), emails: yup.array(yup.string()) }));
    expect(buildDefault(schema)).toMatchObject([{ name: '', emails: [] }]);
  });

  it('CASE-3', () => {
    const schema = yup.object().shape({ name: yup.string(), age: yup.string() });
    expect(buildDefault(schema)).toMatchObject({ name: '', age: '' });
  });

  it('CASE-4', () => {
    const schema = yup.array().of(yup.object().shape({ name: yup.string(), age: yup.string() }));
    expect(buildDefault(schema)).toMatchObject([{ name: '', age: '' }]);
  });

  it('CASE-5', () => {
    const schema = yup.object({
      name: yup.string().required(),
      age: yup.number().required().typeError('Age is required'),
      contact: yup.object().shape({
        email: yup.string().required().email(),
        phone: yup.string().required(),
      }),
      hasHouse: yup
        .boolean()
        .required()
        .transform((value) => Boolean(value))
        .default(false),
      houseAddress: yup.string().optional().when('hasHouse', { is: true, then: yup.string().required() }),
    });
    expect(buildDefault(schema)).toMatchObject({
      name: '',
      age: '',
      contact: { email: '', phone: '' },
      hasHouse: '',
      houseAddress: '',
    });
  });
});
