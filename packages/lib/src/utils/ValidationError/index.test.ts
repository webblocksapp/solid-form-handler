import { ValidationError } from '@utils';

describe('ValidationResult', () => {
  it('Must generate validation result object', () => {
    const validationResult = new ValidationError('field', 'field has error');
    expect(validationResult).toMatchObject({ path: 'field', message: 'field has error' });
  });
});
