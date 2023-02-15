import { screen, render, fireEvent, waitFor } from 'solid-testing-library';
import { Result } from 'solid-testing-library/dist/types';
import { FormHandler } from '@interfaces';
import { Radios } from '@components/legacy';
import { useFormHandler } from '@hooks';
import { zodSchema } from '@utils';
import { schema, Schema, GENDERS } from './mocks';

const onChangeCallback = jest.fn(() => {});
const onBlurCallback = jest.fn(() => {});

describe('Radios with zod', () => {
  let formHandler: FormHandler<Schema>;
  let radios: NodeListOf<HTMLInputElement>;
  let dom: Result;

  beforeEach(() => {
    formHandler = useFormHandler<Schema>(zodSchema(schema));
    dom = render(() => <Radios label="Gender Label" name="gender" options={GENDERS} formHandler={formHandler} />);
    radios = dom.container.querySelectorAll('[name="gender"]');
  });

  afterEach(() => dom.unmount());

  it('Label is rendered', () => {
    expect(screen.getByText('Gender Label')).toBeDefined();
  });

  it('Id is automatically generated', () => {
    expect(radios[0].id).toBeDefined();
    expect(radios[1].id).toBeDefined();
    expect(radios[2].id).toBeDefined();
  });

  it('Id is passed as prop', () => {
    dom = render(() => <Radios id="id-gender" name="gender" options={GENDERS} />);
    radios = dom.container.querySelectorAll('[name="gender"]');
    expect(radios[0].id).toBe('id-gender-0');
    expect(radios[1].id).toBe('id-gender-1');
    expect(radios[2].id).toBe('id-gender-2');
  });

  it('Error reporting disappears onChange', async () => {
    fireEvent.blur(radios[0]);
    fireEvent.click(radios[1]);
    await waitFor(() => {
      expect(formHandler.getFieldError('gender')).toBe('');
    });
  });

  it('Error reporting onBlur', async () => {
    fireEvent.blur(radios[0]);
    await waitFor(() => {
      expect(screen.getByText('gender is a required field')).toBeDefined();
    });
  });

  it('Setting default value programmatically', () => {
    formHandler.setFieldDefaultValue('gender', 'male');
    expect(radios[0].checked).toBe(true);
    expect(radios[1].checked).toBe(false);
    expect(radios[2].checked).toBe(false);
  });

  it('Component reset leaves unchecked', async () => {
    fireEvent.click(radios[0]);
    formHandler.resetForm();
    await waitFor(() => {
      expect(radios[0].checked).toBe(false);
      expect(radios[1].checked).toBe(false);
      expect(radios[2].checked).toBe(false);
    });
  });

  it('Component reset leaves checked if default value matches the value', async () => {
    fireEvent.click(radios[0]);
    formHandler.setFieldDefaultValue('gender', 'male');
    formHandler.resetForm();
    await waitFor(() => {
      expect(radios[0].checked).toBe(true);
      expect(radios[1].checked).toBe(false);
      expect(radios[2].checked).toBe(false);
    });
  });

  it('onChangeCallback is called', () => {
    dom = render(() => (
      <Radios name="gender" options={GENDERS} formHandler={formHandler} onChange={onChangeCallback} />
    ));
    radios = dom.container.querySelectorAll('[name="gender"]');
    fireEvent.click(radios[0]);
    expect(onChangeCallback).toBeCalledTimes(1);
  });

  it('onBlurCallback is called', () => {
    dom = render(() => <Radios name="gender" options={GENDERS} formHandler={formHandler} onBlur={onBlurCallback} />);
    radios = dom.container.querySelectorAll('[name="gender"]');
    fireEvent.blur(radios[0]);
    expect(onBlurCallback).toBeCalledTimes(1);
  });

  it('Default value is set with value prop', () => {
    render(() => <Radios name="gender" value="male" options={GENDERS} formHandler={formHandler} />);
    expect(formHandler.getFieldDefaultValue('gender')).toBe('male');
  });

  it('Default value is set with value prop and persists after form reset', async () => {
    dom = render(() => <Radios name="gender" value="male" options={GENDERS} formHandler={formHandler} />);
    radios = dom.container.querySelectorAll('[name="gender"]');
    await formHandler.resetForm();
    await waitFor(() => {
      expect(radios[0].checked).toBe(true);
    });
  });
});
