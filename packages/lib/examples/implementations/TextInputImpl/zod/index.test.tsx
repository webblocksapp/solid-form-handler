import { screen, render, fireEvent, waitFor } from 'solid-testing-library';
import { TextInputImpl } from '.';

describe('Text input use case', () => {
  it('must render error message on input when value is empty', async () => {
    render(() => <TextInputImpl />);
    fireEvent.input(screen.getByTestId('test-input'), { target: { value: '' } });
    await waitFor(() => {
      expect(screen.getByText('name is a required field')).toBeDefined();
    });
  });

  it('must render error message on blur when value is empty', async () => {
    render(() => <TextInputImpl />);
    fireEvent.blur(screen.getByTestId('test-input'), { target: { value: '' } });
    await waitFor(() => {
      expect(screen.getByText('name is a required field')).toBeDefined();
    });
  });
});
