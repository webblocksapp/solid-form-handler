import { buildDefault } from '@utils';
import * as yup from 'yup';

describe('buildDefault', () => {
  it('CASE-1: should return the expected default object for schema.', () => {
    const schema = yup.object({
      name: yup.string(),
      age: yup.number(),
      contacts: yup.array(yup.object({ name: yup.string(), age: yup.string() })),
    });
    expect(buildDefault(schema)).toMatchObject({ name: '', age: '', contacts: [{ name: '', age: '' }] });
  });

  it('CASE-2: should return the expected default object for schema.', () => {
    const schema = yup.array(yup.object({ name: yup.string(), emails: yup.array(yup.string()) }));
    expect(buildDefault(schema)).toMatchObject([{ name: '', emails: '' }]);
  });
});
