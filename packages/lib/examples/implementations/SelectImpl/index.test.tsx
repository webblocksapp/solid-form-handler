import { screen, render, fireEvent, waitFor } from 'solid-testing-library';
import { SelectImpl } from '.';
import { ySchema, zSchema } from './schemas';

describe('Select with yup use case', () => {
  it('must render error message on select when value is empty', async () => {
    render(() => <SelectImpl schema={ySchema} />);
    fireEvent.change(screen.getByTestId('test-select'), { target: { value: '' } });
    await waitFor(() => {
      expect(screen.getByText('Country is required')).toBeDefined();
    });
  });

  it('must render error message on blur when value is empty', async () => {
    render(() => <SelectImpl schema={ySchema} />);
    fireEvent.blur(screen.getByTestId('test-select'), { target: { value: '' } });
    await waitFor(() => {
      expect(screen.getByText('Country is required')).toBeDefined();
    });
  });
});

describe('Select with zod use case', () => {
  it('must render error message on select when value is empty', async () => {
    render(() => <SelectImpl schema={zSchema} />);
    fireEvent.change(screen.getByTestId('test-select'), { target: { value: '' } });
    await waitFor(() => {
      expect(screen.getByText('Country is required')).toBeDefined();
    });
  });

  it('must render error message on blur when value is empty', async () => {
    render(() => <SelectImpl schema={zSchema} />);
    fireEvent.blur(screen.getByTestId('test-select'), { target: { value: '' } });
    await waitFor(() => {
      expect(screen.getByText('Country is required')).toBeDefined();
    });
  });
});
