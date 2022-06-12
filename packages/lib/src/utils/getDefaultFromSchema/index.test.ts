import { getDefaultFromSchema } from '@utils';
import * as yup from 'yup';

describe('getDefaultFromSchema', () => {
  it('should return the expected default schema', () => {
    expect(getDefaultFromSchema(yup.object({ name: yup.string(), age: yup.number() }))).toMatchObject({
      name: '',
      age: '',
    });
  });
});
