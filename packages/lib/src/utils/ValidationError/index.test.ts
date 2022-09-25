import { ValidationResult } from '@utils';

describe('ValidationResult', () => {
  it('Must generate validation result object', () => {
    const validationResult = new ValidationResult('field', 'field has error');
    expect(validationResult).toMatchObject({ path: 'field', errorMessage: 'field has error' });
  });
});
