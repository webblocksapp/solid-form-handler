import { screen, render, fireEvent, waitFor } from 'solid-testing-library';
import { Result } from 'solid-testing-library/dist/types';
import { FormHandler } from '@interfaces';
import { Select } from '@example-components';
import { useFormHandler } from '@hooks';
import { yupSchema } from '@utils';
import { schema, Schema, COUNTRIES } from './mocks';

const onInputCallback = jest.fn(() => {});
const onBlurCallback = jest.fn(() => {});

describe('Select with zod', () => {
  let formHandler: FormHandler<Schema>;
  let select: HTMLInputElement;
  let dom: Result;

  beforeEach(() => {
    formHandler = useFormHandler<Schema>(yupSchema(schema));
    dom = render(() => <Select label="Country Label" options={COUNTRIES} name="country" formHandler={formHandler} />);
    select = dom.container.querySelector('[name="country"]') as HTMLInputElement;
  });

  afterEach(() => dom.unmount());

  it('Label is rendered', () => {
    expect(screen.getByText('Country Label')).toBeDefined();
  });

  it('Id is automatically generated', () => {
    expect(select.id).toBeDefined();
  });

  it('Id is passed as prop', () => {
    dom = render(() => <Select id="id-country" name="country" />);
    select = dom.container.querySelector('[name="country"]') as HTMLInputElement;
    expect(select.id).toBe('id-country');
  });

  it('Error reporting onInput', async () => {
    fireEvent.input(select, { target: { value: '' } });
    await waitFor(() => {
      expect(screen.getByText('country is a required field')).toBeDefined();
    });
  });

  it('Error reporting onBlur', async () => {
    fireEvent.blur(select);
    await waitFor(() => {
      expect(screen.getByText('country is a required field')).toBeDefined();
    });
  });

  it('Setting default value programmatically', () => {
    formHandler.setFieldDefaultValue('country', 3);
    expect(select.value).toBe('3');
  });

  it('Fill form value is not overridden by default value', async () => {
    formHandler.fillForm({ country: 2 });
    formHandler.setFieldDefaultValue('country', 1);
    await waitFor(() => {
      expect(select.value).toBe('2');
    });
  });

  it('Component value reset', async () => {
    fireEvent.input(select, { target: { value: 2 } });
    formHandler.resetForm();
    await waitFor(() => {
      expect(select.value).toBe('');
    });
  });

  it('Component value reset with default value set', async () => {
    fireEvent.input(select, { target: { value: 2 } });
    formHandler.setFieldDefaultValue('country', 1);
    formHandler.resetForm();
    await waitFor(() => {
      expect(select.value).toBe('1');
    });
  });

  it('onInputCallback is called', () => {
    dom = render(() => <Select name="country" formHandler={formHandler} onInput={onInputCallback} />);
    select = dom.container.querySelector('[name="country"]') as HTMLInputElement;
    fireEvent.input(select, { target: { value: 3 } });
    expect(onInputCallback).toBeCalledTimes(1);
  });

  it('onBlurCallback is called', () => {
    dom = render(() => <Select name="country" formHandler={formHandler} onBlur={onBlurCallback} />);
    select = dom.container.querySelector('[name="country"]') as HTMLInputElement;
    fireEvent.blur(select);
    expect(onBlurCallback).toBeCalledTimes(1);
  });

  it('Default value is set with value prop', () => {
    render(() => <Select name="country" options={COUNTRIES} formHandler={formHandler} value={2} />);
    expect(formHandler.getFieldDefaultValue('country')).toBe(2);
  });

  it('Default value is set with value prop and persists after form reset', async () => {
    dom = render(() => <Select name="country" options={COUNTRIES} formHandler={formHandler} value={2} />);
    select = dom.container.querySelector('[name="country"]') as HTMLInputElement;
    fireEvent.input(select, { target: { value: 1 } });
    formHandler.resetForm();
    await waitFor(() => {
      expect(formHandler.getFieldDefaultValue('country')).toBe(2);
    });
  });
});
