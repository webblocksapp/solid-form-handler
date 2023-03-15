import { FormErrorsException } from '@utils';

describe('FormErrorsException', () => {
  it('Must show the form error validations', () => {
    const error = new FormErrorsException([{ path: 'name', message: 'Name is required' }]);
    expect(error.validationResult[0].message).toBe('Name is required');
  });
});
