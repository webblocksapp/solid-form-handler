import { screen, render, fireEvent, waitFor } from 'solid-testing-library';
import { SelectImpl } from '.';

describe('Select use case', () => {
  it('must render error message on select when value is empty', async () => {
    render(() => <SelectImpl />);
    fireEvent.change(screen.getByTestId('test-select'), { target: { value: '' } });
    await waitFor(() => {
      expect(screen.getByText('Country is required')).toBeDefined();
    });
  });

  it('must render error message on blur when value is empty', async () => {
    render(() => <SelectImpl />);
    fireEvent.blur(screen.getByTestId('test-select'), { target: { value: '' } });
    await waitFor(() => {
      expect(screen.getByText('Country is required')).toBeDefined();
    });
  });
});
