import { screen, render, fireEvent, waitFor } from 'solid-testing-library';
import { CheckboxImpl } from '@implementations';

describe('Checkbox use case', () => {
  it('must render error message on change when value is empty', async () => {
    render(() => <CheckboxImpl />);
    fireEvent.change(screen.getByTestId('test-checkbox'), { target: { value: false } });
    await waitFor(() => {
      expect(screen.getByText('Field must be checked')).toBeDefined();
    });
  });
});
