import { screen, render, fireEvent, waitFor } from 'solid-testing-library';
import { Result } from 'solid-testing-library/dist/types';
import { FormHandler } from '@interfaces';
import { Radio } from '@example-components';
import { useFormHandler } from '@hooks';
import { yupSchema } from '@utils';
import { schema, Schema } from './mocks';

const onChangeCallback = jest.fn(() => {});
const onBlurCallback = jest.fn(() => {});

describe('Radio with yup', () => {
  let formHandler: FormHandler<Schema>;
  let radio: HTMLInputElement;
  let dom: Result;

  beforeEach(() => {
    formHandler = useFormHandler<Schema>(yupSchema(schema));
    dom = render(() => <Radio label="Gender Label" name="gender" value="male" formHandler={formHandler} />);
    radio = dom.container.querySelector('[name="gender"]') as HTMLInputElement;
  });

  afterEach(() => dom.unmount());

  it('Label is rendered', () => {
    expect(screen.getByText('Gender Label')).toBeDefined();
  });

  it('Id is automatically generated', () => {
    expect(radio.id).toBeDefined();
  });

  it('Id is passed as prop', () => {
    dom = render(() => <Radio id="id-gender" name="gender" value="male" />);
    radio = dom.container.querySelector('[name="gender"]') as HTMLInputElement;
    expect(radio.id).toBe('id-gender');
  });

  it('Error reporting disappears onChange', async () => {
    fireEvent.blur(radio);
    fireEvent.click(radio);
    await waitFor(() => {
      expect(formHandler.getFieldError('gender')).toBe('');
    });
  });

  it('Error reporting onBlur', async () => {
    fireEvent.blur(radio);
    await waitFor(() => {
      expect(screen.getByText('gender is a required field')).toBeDefined();
    });
  });

  it('Setting default value programmatically', () => {
    formHandler.setFieldDefaultValue('gender', 'male');
    expect(radio.checked).toBe(true);
  });

  it('Component reset leaves unchecked', async () => {
    fireEvent.click(radio);
    formHandler.resetForm();
    await waitFor(() => {
      expect(radio.checked).toBe(false);
    });
  });

  it('Component reset leaves checked if default value matches the value', async () => {
    fireEvent.click(radio);
    formHandler.setFieldDefaultValue('gender', 'male');
    formHandler.resetForm();
    await waitFor(() => {
      expect(radio.checked).toBe(true);
    });
  });

  it('onChangeCallback is called', () => {
    dom = render(() => <Radio name="gender" value="male" formHandler={formHandler} onChange={onChangeCallback} />);
    radio = dom.container.querySelector('[name="gender"]') as HTMLInputElement;
    fireEvent.click(radio);
    expect(onChangeCallback).toBeCalledTimes(1);
  });

  it('onBlurCallback is called', () => {
    dom = render(() => <Radio name="gender" value="male" formHandler={formHandler} onBlur={onBlurCallback} />);
    radio = dom.container.querySelector('[name="gender"]') as HTMLInputElement;
    fireEvent.blur(radio);
    expect(onBlurCallback).toBeCalledTimes(1);
  });

  it('Default value is set with checked prop', () => {
    formHandler = useFormHandler<Schema>(yupSchema(schema));
    dom = render(() => <Radio checked name="gender" value="male" formHandler={formHandler} />);
    radio = dom.container.querySelector('[name="gender"]') as HTMLInputElement;
    expect(radio.checked).toBe(true);
  });

  it('Default value is set with checked prop and persists after form reset', async () => {
    formHandler = useFormHandler<Schema>(yupSchema(schema));
    dom = render(() => <Radio checked label="Gender Label" name="gender" value="male" formHandler={formHandler} />);
    radio = dom.container.querySelector('[name="gender"]') as HTMLInputElement;
    await formHandler.resetForm();
    await waitFor(() => {
      expect(radio.checked).toBe(true);
    });
  });
});
