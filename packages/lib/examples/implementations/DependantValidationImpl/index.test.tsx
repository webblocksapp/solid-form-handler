import { screen, render, fireEvent, waitFor } from 'solid-testing-library';
import { DependantValidationImpl } from '.';

describe('Dependant validations impl.', () => {
  it('each field must render error message on blur', async () => {
    render(() => <DependantValidationImpl />);
    fireEvent.blur(screen.getByTestId('test-password'));
    fireEvent.blur(screen.getByTestId('test-passwordConfirm'));
    await waitFor(() => {
      expect(screen.getByText('password is a required field')).toBeDefined();
      expect(screen.getByText('passwordConfirm is a required field')).toBeDefined();
    });
  });
});
