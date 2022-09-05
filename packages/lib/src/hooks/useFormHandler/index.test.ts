import { useFormHandler } from '@hooks';
import { yupSchema } from '@utils';
import { personSchema, contactSchema } from './mocks';

describe('useFormHandler', () => {
  it('formHandler object must be defined', () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    expect(formHandler).toBeDefined();
  });

  it('If field path is no provided, the returned value is an empty string', () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    formHandler.setFieldValue('', 'George');
    expect(formHandler.getFieldValue('name')).toBe('');
  });

  it('Required name value, must be valid', async () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    await formHandler.setFieldValue('name', 'George');
    expect(formHandler.getFieldError('name')).toBe('');
    expect(formHandler.isFieldInvalid('name')).toBe(false);
  });

  it('Required name value, must be invalid', async () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    await formHandler.setFieldValue('name', '');
    expect(formHandler.getFieldError('name')).toBe('name is a required field');
    expect(formHandler.isFieldInvalid('name')).toBe(true);
  });

  it('is form invalid', async () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    try {
      await formHandler.validateForm();
    } catch (_) {
      expect(formHandler.isFormInvalid()).toBe(true);
    }
  });

  it('is form valid', async () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    formHandler.setFieldValue('name', 'George');
    formHandler.setFieldValue('age', 60);
    await formHandler.validateForm();
    expect(formHandler.isFormInvalid()).toBe(false);
  });

  it('Form data matches the set data', async () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    formHandler.setFieldValue('name', 'George');
    formHandler.setFieldValue('age', 60);
    expect(formHandler.formData()).toMatchObject({ name: 'George', age: 60 });
  });

  it('Form has changes', async () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    formHandler.setFieldValue('name', 'George');
    expect(formHandler.formHasChanges()).toBe(true);
  });

  it("Form doesn't have changes", async () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    await formHandler.fillForm({ name: 'George' });
    await formHandler.setFieldValue('name', 'George');
    expect(formHandler.formHasChanges()).toBe(false);
  });

  it('form is filled', async () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    await formHandler.fillForm({ name: 'George', age: 60 });
    expect(formHandler.formData()).toMatchObject({ name: 'George', age: 60 });
  });

  it('form state match object when form is filled', async () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    await formHandler.fillForm({ name: 'George', age: 60 });
    expect(formHandler.getFormState()).toMatchObject({
      name: {
        __state: true,
        isInvalid: false,
        errorMessage: '',
        initialValue: 'George',
        touched: false,
        dirty: false,
      },
      age: {
        __state: true,
        isInvalid: false,
        errorMessage: '',
        initialValue: 60,
        touched: false,
        dirty: false,
      },
    });
  });

  it('Schema with nested objects: form state match object when form is filled', async () => {
    const formHandler = useFormHandler(yupSchema(contactSchema));
    await formHandler.fillForm({ contact: { name: 'John', age: 28 } });
    expect(formHandler.getFormState()).toMatchObject({
      contact: {
        name: {
          __state: true,
          isInvalid: false,
          errorMessage: '',
          initialValue: 'John',
          touched: false,
          dirty: false,
        },
        age: {
          __state: true,
          isInvalid: false,
          errorMessage: '',
          initialValue: 28,
          touched: false,
          dirty: false,
        },
      },
    });
  });

  it('Schema with nested objects: form state match object when field value is set', async () => {
    const formHandler = useFormHandler(yupSchema(contactSchema));
    await formHandler.setFieldValue('contact', { name: 'John', age: 28 });
    expect(formHandler.getFormState()).toMatchObject({
      contact: {
        name: {
          __state: true,
          isInvalid: false,
          errorMessage: '',
          initialValue: '',
          touched: true,
          dirty: true,
        },
        age: {
          __state: true,
          isInvalid: false,
          errorMessage: '',
          initialValue: '',
          touched: true,
          dirty: true,
        },
      },
    });
  });
});
