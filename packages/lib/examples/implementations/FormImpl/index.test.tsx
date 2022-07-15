import { screen, render, fireEvent, waitFor } from 'solid-testing-library';
import { FormImpl } from '@implementations';

describe('Form implementation', () => {
  it('must display all error validations on submit', async () => {
    render(() => <FormImpl />);
    fireEvent.click(screen.getByTestId('submit'));
    await waitFor(() => {
      expect(screen.getByText('name is a required field')).toBeDefined();
      expect(screen.getByText('Age is required')).toBeDefined();
    });
  });

  it('no errors must be displayed on submit', async () => {
    render(() => <FormImpl />);
    fireEvent.input(screen.getByTestId('name'), { target: { value: 'John' } });
    fireEvent.input(screen.getByTestId('age'), { target: { value: '28' } });
    fireEvent.click(screen.getByTestId('submit'));
    await waitFor(async () => {
      expect(screen.getByTestId('error').innerHTML).toBe('');
    });
  });
});
