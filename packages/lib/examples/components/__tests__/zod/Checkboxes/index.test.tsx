import { screen, render, fireEvent, waitFor } from 'solid-testing-library';
import { Result } from 'solid-testing-library/dist/types';
import { FormHandler } from '@interfaces';
import { Checkboxes } from '@example-components';
import { useFormHandler } from '@hooks';
import { zodSchema } from '@utils';
import { schema, Schema, FAVORITE_FOODS } from './mocks';

const onChangeCallback = jest.fn(() => {});
const onBlurCallback = jest.fn(() => {});

describe('Checkboxes with zod', () => {
  let formHandler: FormHandler<Schema>;
  let checkboxes: NodeListOf<HTMLInputElement>;
  let dom: Result;

  beforeEach(() => {
    formHandler = useFormHandler<Schema>(zodSchema(schema));
    dom = render(() => (
      <Checkboxes
        label="Favorite foods Label"
        name="favoriteFoods"
        options={FAVORITE_FOODS}
        formHandler={formHandler}
      />
    ));
    checkboxes = dom.container.querySelectorAll('[name="favoriteFoods"]');
  });

  afterEach(() => dom.unmount());

  it('Label is rendered', () => {
    expect(screen.getByText('Favorite foods Label')).toBeDefined();
  });

  it('Id is automatically generated', () => {
    expect(checkboxes[0].id).toBeDefined();
    expect(checkboxes[1].id).toBeDefined();
    expect(checkboxes[2].id).toBeDefined();
  });

  it('Id is passed as prop', () => {
    dom = render(() => <Checkboxes id="id-favoriteFoods" name="favoriteFoods" options={FAVORITE_FOODS} />);
    checkboxes = dom.container.querySelectorAll('[name="favoriteFoods"]');
    expect(checkboxes[0].id).toBe('id-favoriteFoods-0');
    expect(checkboxes[1].id).toBe('id-favoriteFoods-1');
    expect(checkboxes[2].id).toBe('id-favoriteFoods-2');
  });

  it('Error reporting disappears onChange', async () => {
    fireEvent.blur(checkboxes[0]);
    fireEvent.click(checkboxes[1]);
    await waitFor(() => {
      expect(formHandler.getFieldError('favoriteFoods')).toBe('');
    });
  });

  it('Error reporting onBlur', async () => {
    fireEvent.blur(checkboxes[0]);
    await waitFor(() => {
      expect(screen.getByText('favoriteFoods is a required field')).toBeDefined();
    });
  });

  it('Setting default value programmatically', () => {
    formHandler.setFieldDefaultValue('favoriteFoods', [1]);
    expect(checkboxes[0].checked).toBe(true);
    expect(checkboxes[1].checked).toBe(false);
    expect(checkboxes[2].checked).toBe(false);
  });

  it('Component reset leaves unchecked', async () => {
    fireEvent.click(checkboxes[0]);
    formHandler.resetForm();
    await waitFor(() => {
      expect(checkboxes[0].checked).toBe(false);
      expect(checkboxes[1].checked).toBe(false);
      expect(checkboxes[2].checked).toBe(false);
    });
  });

  it('Component reset leaves checked if default value matches the value', async () => {
    fireEvent.click(checkboxes[0]);
    formHandler.setFieldDefaultValue('favoriteFoods', [1]);
    formHandler.resetForm();
    await waitFor(() => {
      expect(checkboxes[0].checked).toBe(true);
      expect(checkboxes[1].checked).toBe(false);
      expect(checkboxes[2].checked).toBe(false);
    });
  });

  it('onChangeCallback is called', () => {
    dom = render(() => (
      <Checkboxes name="favoriteFoods" options={FAVORITE_FOODS} formHandler={formHandler} onChange={onChangeCallback} />
    ));
    checkboxes = dom.container.querySelectorAll('[name="favoriteFoods"]');
    fireEvent.click(checkboxes[0]);
    expect(onChangeCallback).toBeCalledTimes(1);
  });

  it('onBlurCallback is called', () => {
    dom = render(() => (
      <Checkboxes name="favoriteFoods" options={FAVORITE_FOODS} formHandler={formHandler} onBlur={onBlurCallback} />
    ));
    checkboxes = dom.container.querySelectorAll('[name="favoriteFoods"]');
    fireEvent.blur(checkboxes[0]);
    expect(onBlurCallback).toBeCalledTimes(1);
  });

  it('Default value is set with value prop', () => {
    render(() => <Checkboxes name="favoriteFoods" value={[1]} options={FAVORITE_FOODS} formHandler={formHandler} />);
    expect(formHandler.getFieldDefaultValue('favoriteFoods')).toMatchObject([1]);
    expect(checkboxes[0].checked).toBe(true);
  });

  it('Default value is set with value prop and persists after form reset', async () => {
    dom = render(() => (
      <Checkboxes name="favoriteFoods" value={[1]} options={FAVORITE_FOODS} formHandler={formHandler} />
    ));
    checkboxes = dom.container.querySelectorAll('[name="favoriteFoods"]');
    await formHandler.resetForm();
    await waitFor(() => {
      expect(formHandler.getFieldValue('favoriteFoods')).toMatchObject([1]);
      expect(checkboxes[0].checked).toBe(true);
    });
  });
});
