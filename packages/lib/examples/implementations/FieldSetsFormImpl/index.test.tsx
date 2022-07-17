import { screen, render, fireEvent, waitFor } from 'solid-testing-library';
import { FieldsetsFormImpl } from '@implementations';

describe('FieldsetsFormImpl', () => {
  it('adds a fieldset', async () => {
    render(() => <FieldsetsFormImpl />);
    fireEvent.click(screen.getByTestId('add'));
    fireEvent.click(screen.getByTestId('add'));
    await waitFor(() => {
      expect(screen.getAllByTestId('fieldset').length).toBe(3);
    });
  });

  it('removes a fieldset', async () => {
    render(() => <FieldsetsFormImpl />);
    fireEvent.click(screen.getByTestId('add'));
    fireEvent.click(screen.getByTestId('add'));
    fireEvent.click(screen.getByTestId('remove-2'));
    await waitFor(() => {
      expect(screen.getAllByTestId('fieldset').length).toBe(2);
    });
  });
});
