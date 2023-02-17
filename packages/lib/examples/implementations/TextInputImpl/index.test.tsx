import { screen, render, fireEvent, waitFor } from 'solid-testing-library';
import { TextInputImpl } from '.';
import { ySchema, zSchema } from './schemas';

describe('Text input with yup use case', () => {
  it('must render error message on input when value is empty', async () => {
    render(() => <TextInputImpl schema={ySchema} />);
    fireEvent.input(screen.getByTestId('test-input'), { target: { value: '' } });
    await waitFor(() => {
      expect(screen.getByText('name is a required field')).toBeDefined();
    });
  });

  it('must render error message on blur when value is empty', async () => {
    render(() => <TextInputImpl schema={ySchema} />);
    fireEvent.blur(screen.getByTestId('test-input'), { target: { value: '' } });
    await waitFor(() => {
      expect(screen.getByText('name is a required field')).toBeDefined();
    });
  });
});

describe('Text input with zod use case', () => {
  it('must render error message on input when value is empty', async () => {
    render(() => <TextInputImpl schema={zSchema} />);
    fireEvent.input(screen.getByTestId('test-input'), { target: { value: '' } });
    await waitFor(() => {
      expect(screen.getByText('name is a required field')).toBeDefined();
    });
  });

  it('must render error message on blur when value is empty', async () => {
    render(() => <TextInputImpl schema={zSchema} />);
    fireEvent.blur(screen.getByTestId('test-input'), { target: { value: '' } });
    await waitFor(() => {
      expect(screen.getByText('name is a required field')).toBeDefined();
    });
  });
});
