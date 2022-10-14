import { screen, render, fireEvent, waitFor } from 'solid-testing-library';
import { Result } from 'solid-testing-library/dist/types';
import { FormHandler } from '@interfaces';
import { TextInput } from '@components';
import { useFormHandler } from '@hooks';
import { yupSchema } from '@utils';
import { schema, Schema } from './mocks';

const onInputCallback = jest.fn(() => {});
const onBlurCallback = jest.fn(() => {});

describe('TextInput', () => {
  let formHandler: FormHandler<Schema>;
  let textInput: HTMLInputElement;
  let dom: Result;

  beforeEach(() => {
    formHandler = useFormHandler<Schema>(yupSchema(schema));
    dom = render(() => <TextInput label="Name Label" name="name" formHandler={formHandler} />);
    textInput = dom.container.querySelector('[name="name"]') as HTMLInputElement;
  });

  afterEach(() => dom.unmount());

  it('Label is rendered', () => {
    expect(screen.getByText('Name Label')).toBeDefined();
  });

  it('Id is automatically generated', () => {
    expect(textInput.id).toBe('name');
  });

  it('Id is passed as prop', () => {
    dom = render(() => <TextInput id="id-name" name="name" />);
    textInput = dom.container.querySelector('[name="name"]') as HTMLInputElement;
    expect(textInput.id).toBe('id-name');
  });

  it('Error reporting onInput', async () => {
    fireEvent.input(textInput, { target: { value: '' } });
    await waitFor(() => {
      expect(screen.getByText('name is a required field')).toBeDefined();
    });
  });

  it('Error reporting onBlur', async () => {
    fireEvent.blur(textInput);
    await waitFor(() => {
      expect(screen.getByText('name is a required field')).toBeDefined();
    });
  });

  it('Setting default value programmatically', () => {
    formHandler.setFieldDefaultValue('name', 'John');
    expect(textInput.value).toBe('John');
  });

  it('Fill form value is not overridden by default value', async () => {
    formHandler.fillForm({ name: 'Laura' });
    formHandler.setFieldDefaultValue('name', 'John');
    await waitFor(() => {
      expect(textInput.value).toBe('Laura');
    });
  });

  it('Component value reset', async () => {
    fireEvent.input(textInput, { target: { value: 'Laura' } });
    formHandler.resetForm();
    await waitFor(() => {
      expect(textInput.value).toBe('');
    });
  });

  it('Component value reset with default value set', async () => {
    fireEvent.input(textInput, { target: { value: 'Laura' } });
    formHandler.setFieldDefaultValue('name', 'John');
    formHandler.resetForm();
    await waitFor(() => {
      expect(textInput.value).toBe('John');
    });
  });

  it('onInputCallback is called', () => {
    dom = render(() => <TextInput name="name" formHandler={formHandler} onInput={onInputCallback} />);
    textInput = dom.container.querySelector('[name="name"]') as HTMLInputElement;
    fireEvent.input(textInput, { target: { value: 'XXX' } });
    expect(onInputCallback).toBeCalledTimes(1);
  });

  it('onBlurCallback is called', () => {
    dom = render(() => <TextInput name="name" formHandler={formHandler} onBlur={onBlurCallback} />);
    textInput = dom.container.querySelector('[name="name"]') as HTMLInputElement;
    fireEvent.blur(textInput);
    expect(onBlurCallback).toBeCalledTimes(1);
  });

  it('Default value is set with value prop', () => {
    render(() => <TextInput name="name" formHandler={formHandler} value="Louise" />);
    expect(formHandler.getFieldDefaultValue('name')).toBe('Louise');
  });

  it('Default value is set with value prop and persists after form reset', async () => {
    dom = render(() => <TextInput name="name" formHandler={formHandler} value="Louise" />);
    textInput = dom.container.querySelector('[name="name"]') as HTMLInputElement;
    fireEvent.input(textInput, { target: { value: 'Laura' } });
    formHandler.resetForm();
    await waitFor(() => {
      expect(formHandler.getFieldDefaultValue('name')).toBe('Louise');
    });
  });
});
