import { useFormHandler } from '@hooks';
import * as yup from 'yup';
import { SchemaOf } from 'yup';

type TestSchema = {
  name: string;
  age: number;
};

const schema: SchemaOf<TestSchema> = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required(),
});

describe('useFormHandler', () => {
  it('formHandler object must be defined', () => {
    const formHandler = useFormHandler(schema);
    expect(formHandler).toBeDefined();
  });

  it('If field path is no provided, the returned value is an empty string', () => {
    const formHandler = useFormHandler(schema);
    formHandler.setFieldValue('', 'George');
    expect(formHandler.getFieldValue('name')).toBe('');
  });

  it('Required name value, must be valid - with no error message', () => {
    const formHandler = useFormHandler(schema);
    formHandler.setFieldValue('name', 'George');
    expect(formHandler.getFieldError('name')).toBe('');
  });

  it('Required name value, must be invalid - with required error message', async () => {
    const formHandler = useFormHandler(schema);
    await formHandler.setFieldValue('name', '');
    expect(formHandler.getFieldError('name')).toBe('name is a required field');
  });

  it('validateField fails with an unknown error if no existing path is provided', async () => {
    const formHandler = useFormHandler(schema);
    await formHandler.validateField('x');
    expect(formHandler.getFieldError('x')).toBe('');
  });

  it('is form invalid', async () => {
    const formHandler = useFormHandler(schema);
    await formHandler.validate();
    expect(formHandler.isFormInvalid()).toBe(true);
  });

  it('is form valid', async () => {
    const formHandler = useFormHandler(schema);
    formHandler.setFieldValue('name', 'George');
    formHandler.setFieldValue('age', 60);
    await formHandler.validate();
    expect(formHandler.isFormInvalid()).toBe(false);
  });

  it('Form data matches the set data', async () => {
    const formHandler = useFormHandler(schema);
    formHandler.setFieldValue('name', 'George');
    formHandler.setFieldValue('age', 60);
    expect(formHandler.getFormData()).toMatchObject({ name: 'George', age: 60 });
  });

  it('Form has changes', async () => {
    const formHandler = useFormHandler(schema);
    formHandler.setFieldValue('name', 'George');
    expect(formHandler.formHasChanges()).toBe(true);
  });

  it("Form doesn't have changes", async () => {
    const formHandler = useFormHandler(schema);
    formHandler.initFormField('name', 'George');
    formHandler.initFormField('age', 60);
    formHandler.setFieldValue('name', 'George');
    formHandler.setFieldValue('age', 60);
    expect(formHandler.formHasChanges()).toBe(false);
  });
});
