import { FormErrorsException } from '@utils';

describe('FormErrorsException', () => {
  it('Must show the form error validations', () => {
    const error = new FormErrorsException([{ path: 'name', errorMessage: 'Name is required' }]);
    expect(error.validationResult[0].errorMessage).toBe('Name is required');
  });
});
