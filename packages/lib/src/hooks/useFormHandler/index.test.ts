import { useFormHandler } from '@hooks';
import { yupSchema } from '@utils';
import { personSchema, contactSchema, personsSchema, Person, referralsSchema } from './mocks';

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
    await formHandler.fillForm({ name: 'George', age: 19 });
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

  it('Fieldsets: default form data must be an array of 1 record', () => {
    const formHandler = useFormHandler(yupSchema(personsSchema));
    expect(formHandler.formData()).toMatchObject([{ name: '', age: '' }]);
  });

  it('Fieldsets add: form data matches the expected object', async () => {
    const formHandler = useFormHandler(yupSchema(personsSchema));
    formHandler.addFieldset();
    expect(formHandler.formData()).toMatchObject([
      { name: '', age: '' },
      { name: '', age: '' },
    ]);
  });

  it('Fieldsets multiple adds: form data matches the expected object', async () => {
    const formHandler = useFormHandler(yupSchema(personsSchema));
    formHandler.addFieldset();
    formHandler.addFieldset();
    formHandler.addFieldset();
    expect(formHandler.formData()).toMatchObject([
      { name: '', age: '' },
      { name: '', age: '' },
      { name: '', age: '' },
      { name: '', age: '' },
    ]);
  });

  it('Fieldsets add with data: form data matches the expected object', async () => {
    const formHandler = useFormHandler(yupSchema(personsSchema));
    formHandler.addFieldset<Person>({ data: { name: 'John', age: 18 } });
    expect(formHandler.formData()).toMatchObject([
      { name: '', age: '' },
      { name: 'John', age: 18 },
    ]);
  });

  it('Fieldsets multiple adds with data: form data matches the expected object', async () => {
    const formHandler = useFormHandler(yupSchema(personsSchema));
    formHandler.addFieldset<Person>({ data: { name: 'John', age: 18 } });
    formHandler.addFieldset<Person>({ data: { name: 'Mary', age: 23 } });
    formHandler.addFieldset<Person>({ data: { name: 'Louis', age: 55 } });
    formHandler.addFieldset<Person>({ data: { name: 'Matt', age: 38 } });
    expect(formHandler.formData()).toMatchObject([
      { name: '', age: '' },
      { name: 'John', age: 18 },
      { name: 'Mary', age: 23 },
      { name: 'Louis', age: 55 },
      { name: 'Matt', age: 38 },
    ]);
  });

  it('Fieldsets remove: form data matches the expected object', async () => {
    const formHandler = useFormHandler(yupSchema(personsSchema));
    formHandler.addFieldset<Person>({ data: { name: 'John', age: 18 } });
    formHandler.removeFieldset(0);
    expect(formHandler.formData()).toMatchObject([{ name: 'John', age: 18 }]);
  });

  it('Fieldsets multiples remove: form data matches the expected object', async () => {
    const formHandler = useFormHandler(yupSchema(personsSchema));
    formHandler.addFieldset<Person>({ data: { name: 'John', age: 18 } });
    formHandler.addFieldset<Person>({ data: { name: 'Mary', age: 23 } });
    formHandler.addFieldset<Person>({ data: { name: 'Louis', age: 55 } });
    formHandler.addFieldset<Person>({ data: { name: 'Matt', age: 38 } });
    formHandler.removeFieldset(0);
    formHandler.removeFieldset(2);
    expect(formHandler.formData()).toMatchObject([
      { name: 'John', age: 18 },
      { name: 'Mary', age: 23 },
      { name: 'Matt', age: 38 },
    ]);
  });

  it('Fieldsets sort: form data matches the expected object', async () => {
    const formHandler = useFormHandler(yupSchema(personsSchema));
    formHandler.addFieldset<Person>({ data: { name: 'John', age: 18 } });
    formHandler.moveFieldset(1, 0);
    expect(formHandler.formData()).toMatchObject([
      { name: 'John', age: 18 },
      { name: '', age: '' },
    ]);
  });

  it('Fieldsets multiples sorts: form data matches the expected object', async () => {
    const formHandler = useFormHandler(yupSchema(personsSchema));
    formHandler.addFieldset<Person>({ data: { name: 'John', age: 18 } });
    formHandler.addFieldset<Person>({ data: { name: 'Mary', age: 23 } });
    formHandler.addFieldset<Person>({ data: { name: 'Louis', age: 55 } });
    formHandler.addFieldset<Person>({ data: { name: 'Matt', age: 38 } });
    formHandler.moveFieldset(1, 0);
    formHandler.moveFieldset(4, 3);
    formHandler.moveFieldset(2, 1);
    expect(formHandler.formData()).toMatchObject([
      { name: 'John', age: 18 },
      { name: 'Mary', age: 23 },
      { name: '', age: '' },
      { name: 'Matt', age: 38 },
      { name: 'Louis', age: 55 },
    ]);
  });

  it('Nested fieldsets: default form data must be an array of 1 record', () => {
    const formHandler = useFormHandler(yupSchema(referralsSchema));
    expect(formHandler.formData().referrals).toMatchObject([{ name: '', age: '' }]);
  });

  it('Nested fieldsets add: form data matches the expected object', async () => {
    const formHandler = useFormHandler(yupSchema(referralsSchema));
    formHandler.addFieldset({ basePath: 'referrals' });
    expect(formHandler.formData()).toMatchObject({
      referrals: [
        { name: '', age: '' },
        { name: '', age: '' },
      ],
    });
  });

  it('Nested fieldsets add with data: form data matches the expected object', async () => {
    const formHandler = useFormHandler(yupSchema(referralsSchema));
    formHandler.addFieldset<Person>({ basePath: 'referrals', data: { name: 'John', age: 18 } });
    expect(formHandler.formData()).toMatchObject({
      referrals: [
        { name: '', age: '' },
        { name: 'John', age: 18 },
      ],
    });
  });

  it('Nested fieldsets remove: form data matches the expected object', async () => {
    const formHandler = useFormHandler(yupSchema(referralsSchema));
    formHandler.addFieldset<Person>({ basePath: 'referrals', data: { name: 'John', age: 18 } });
    formHandler.removeFieldset(0, 'referrals');
    expect(formHandler.formData()).toMatchObject({
      referrals: [{ name: 'John', age: 18 }],
    });
  });

  it('Nested fieldsets sort: form data matches the expected object', async () => {
    const formHandler = useFormHandler(yupSchema(referralsSchema));
    formHandler.addFieldset<Person>({ basePath: 'referrals', data: { name: 'John', age: 18 } });
    formHandler.moveFieldset(1, 0, 'referrals');
    expect(formHandler.formData()).toMatchObject({
      referrals: [
        { name: 'John', age: 18 },
        { name: '', age: '' },
      ],
    });
  });
});
