import { screen, render, fireEvent, waitFor } from 'solid-testing-library';
import { Result } from 'solid-testing-library/dist/types';
import { FormHandler } from '@interfaces';
import { Checkbox } from '@components';
import { useFormHandler } from '@hooks';
import { yupSchema } from '@utils';
import { schema, Schema } from './mocks';

const onChangeCallback = jest.fn(() => {});
const onBlurCallback = jest.fn(() => {});

describe('Checkbox ', () => {
  let formHandler: FormHandler<Schema>;
  let checkbox: HTMLInputElement;
  let dom: Result;

  beforeEach(() => {
    formHandler = useFormHandler<Schema>(yupSchema(schema));
    dom = render(() => <Checkbox label="Subscribed Label" name="subscribed" formHandler={formHandler} />);
    checkbox = dom.container.querySelector('[name="subscribed"]') as HTMLInputElement;
  });

  afterEach(() => dom.unmount());

  it('Label is rendered', () => {
    expect(screen.getByText('Subscribed Label')).toBeDefined();
  });

  it('Id is automatically generated', () => {
    expect(checkbox.id).toBe('subscribed');
  });

  it('Id is passed as prop', () => {
    dom = render(() => <Checkbox id="id-subscribed" name="subscribed" />);
    checkbox = dom.container.querySelector('[name="subscribed"]') as HTMLInputElement;
    expect(checkbox.id).toBe('id-subscribed');
  });

  it('Error reporting disappears onChange', async () => {
    fireEvent.blur(checkbox);
    fireEvent.click(checkbox);
    await waitFor(() => {
      expect(formHandler.getFieldError('subscribed')).toBe('');
    });
  });

  it('Error reporting onBlur', async () => {
    fireEvent.blur(checkbox);
    await waitFor(() => {
      expect(screen.getByText('subscribed is a required field')).toBeDefined();
    });
  });

  it('Setting default value programmatically', () => {
    formHandler.setFieldDefaultValue('subscribed', true);
    expect(checkbox.checked).toBe(true);
  });

  it('Component reset leaves unchecked', async () => {
    fireEvent.click(checkbox);
    formHandler.resetForm();
    await waitFor(() => {
      expect(checkbox.checked).toBe(false);
    });
  });

  it('Component reset leaves checked if default value matches the value', async () => {
    fireEvent.click(checkbox);
    formHandler.setFieldDefaultValue('subscribed', true);
    formHandler.resetForm();
    await waitFor(() => {
      expect(checkbox.checked).toBe(true);
    });
  });

  it('onChangeCallback is called', () => {
    dom = render(() => <Checkbox name="subscribed" formHandler={formHandler} onChange={onChangeCallback} />);
    checkbox = dom.container.querySelector('[name="subscribed"]') as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(onChangeCallback).toBeCalledTimes(1);
  });

  it('onBlurCallback is called', () => {
    dom = render(() => <Checkbox name="subscribed" formHandler={formHandler} onBlur={onBlurCallback} />);
    checkbox = dom.container.querySelector('[name="subscribed"]') as HTMLInputElement;
    fireEvent.blur(checkbox);
    expect(onBlurCallback).toBeCalledTimes(1);
  });

  it('Default value is set with checked prop', () => {
    render(() => <Checkbox name="subscribed" checked formHandler={formHandler} />);
    expect(formHandler.getFieldDefaultValue('subscribed')).toBe(true);
  });

  it('Default value is set with checked prop and persists after form reset', async () => {
    dom = render(() => <Checkbox name="subscribed" checked formHandler={formHandler} />);
    checkbox = dom.container.querySelector('[name="subscribed"]') as HTMLInputElement;
    fireEvent.click(checkbox);
    formHandler.resetForm();
    await waitFor(() => {
      expect(formHandler.getFieldDefaultValue('subscribed')).toBe(true);
    });
  });
});
