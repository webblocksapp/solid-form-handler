import { screen, render, fireEvent, waitFor } from 'solid-testing-library';
import { Result } from 'solid-testing-library/dist/types';
import { FormHandler } from '@interfaces';
import { Checkbox } from '@components';
import { useFormHandler } from '@hooks';
import { zodSchema } from '@utils';
import { schema, Schema } from './mocks';

const onChangeCallback = jest.fn(() => {});
const onBlurCallback = jest.fn(() => {});

describe('Checkbox with yup', () => {
  let formHandler: FormHandler<Schema>;
  let checkbox: HTMLInputElement;
  let dom: Result;

  beforeEach(() => {
    formHandler = useFormHandler<Schema>(zodSchema(schema));
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

  it('Value prop is set at form handler when checked', async () => {
    dom = render(() => <Checkbox name="status" value="enabled" uncheckedValue="disabled" formHandler={formHandler} />);
    checkbox = dom.container.querySelector('[name="status"]') as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    expect(formHandler.getFieldValue('status')).toBe('enabled');
  });

  it('Unchecked value prop is set at form handler when unchecked', async () => {
    dom = render(() => <Checkbox name="status" value="enabled" uncheckedValue="disabled" formHandler={formHandler} />);
    checkbox = dom.container.querySelector('[name="status"]') as HTMLInputElement;
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
    expect(formHandler.getFieldValue('status')).toBe('disabled');
  });

  it('If checked and value prop given, form handler takes as value the value prop.', async () => {
    dom = render(() => (
      <Checkbox checked name="status" value="enabled" uncheckedValue="disabled" formHandler={formHandler} />
    ));
    checkbox = dom.container.querySelector('[name="status"]') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
    expect(formHandler.getFieldValue('status')).toBe('enabled');
  });

  it('If unchecked and uncheckedValue prop given, form handler takes as value the uncheckedValue prop.', async () => {
    dom = render(() => <Checkbox name="status" value="enabled" uncheckedValue="disabled" formHandler={formHandler} />);
    checkbox = dom.container.querySelector('[name="status"]') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    expect(formHandler.getFieldValue('status')).toBe('disabled');
  });

  it('If default value matches value, checkbox is checked.', async () => {
    formHandler.setFieldDefaultValue('status', 'enabled');
    dom = render(() => <Checkbox name="status" value="enabled" uncheckedValue="disabled" formHandler={formHandler} />);
    checkbox = dom.container.querySelector('[name="status"]') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
    expect(formHandler.getFieldValue('status')).toBe('enabled');
  });

  it('If default value matches unchecked value, checkbox is unchecked.', async () => {
    formHandler.setFieldDefaultValue('status', 'disabled');
    dom = render(() => <Checkbox name="status" value="enabled" uncheckedValue="disabled" formHandler={formHandler} />);
    checkbox = dom.container.querySelector('[name="status"]') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    expect(formHandler.getFieldValue('status')).toBe('disabled');
  });
});
