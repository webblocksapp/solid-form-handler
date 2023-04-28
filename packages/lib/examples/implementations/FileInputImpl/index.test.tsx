import { screen, render, fireEvent, waitFor } from 'solid-testing-library';
import { FileInputImpl } from '.';
import { ySchema, zSchema } from './schemas';

describe('Text input with yup use case', () => {
  let fileInput: HTMLButtonElement;

  beforeEach(() => {
    const dom = render(() => <FileInputImpl schema={ySchema} />);
    fileInput = dom.container.querySelector('[type="button"]')!;
  });

  it('must render error message on blur when value is empty', async () => {
    fireEvent.blur(fileInput);
    await waitFor(() => {
      expect(screen.getByText('File is required')).toBeDefined();
    });
  });
});

describe('Text input with zod use case', () => {
  let fileInput: HTMLButtonElement;

  beforeEach(() => {
    const dom = render(() => <FileInputImpl schema={zSchema} />);
    fileInput = dom.container.querySelector('[type="button"]')!;
  });

  it('must render error message on blur when value is empty', async () => {
    fireEvent.blur(fileInput);
    await waitFor(() => {
      expect(screen.getByText('File is required')).toBeDefined();
    });
  });
});
