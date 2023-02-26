import { useFormHandler } from '@hooks';
import { FieldState, FormFieldError } from '@interfaces';
import { FormErrorsException, yupSchema } from '@utils';
import {
  personSchema,
  contactSchema,
  personsSchema,
  referralsSchema,
  triggersSchema,
  countriesSchema,
  countriesObjSchema,
} from './mocks.yup';

describe('useFormHandler with yup', () => {
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
    } catch (error) {
      expect(formHandler.isFormInvalid()).toBe(true);
      if (error instanceof FormErrorsException) {
        expect(error.validationResult).toEqual(
          expect.arrayContaining([
            {
              path: 'age',
              errorMessage: 'age is a required field',
            },
            {
              path: 'name',
              errorMessage: 'name is a required field',
            },
          ])
        );
      }
    }
  });

  it('is form valid', async () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    await formHandler.setFieldValue('name', 'George');
    await formHandler.setFieldValue('age', 60);
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
    await formHandler.setFieldValue('name', 'George');
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

  it('field state is updated as expected', () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    formHandler._.setFieldState('name', (fieldState: FieldState) => ({ ...fieldState, dirty: true }));
    expect(formHandler._.getFieldState('name')).toEqual(
      expect.objectContaining({
        dirty: true,
      })
    );
  });

  it('field state is updated when added a fieldset', () => {
    const formHandler = useFormHandler(yupSchema(personsSchema));
    formHandler.addFieldset();
    expect(formHandler._.getFieldState('1.name')).toEqual(
      expect.objectContaining({
        isInvalid: true,
      })
    );
  });

  it('form state match object when form is filled', async () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    await formHandler.fillForm({ name: 'George', age: 60 });
    expect(formHandler.getFormState()).toEqual(
      expect.objectContaining({
        name: expect.objectContaining({
          state: expect.objectContaining({
            isInvalid: false,
            errorMessage: '',
            currentValue: 'George',
            initialValue: 'George',
            defaultValue: '',
            touched: false,
            dirty: false,
          }),
        }),
        age: expect.objectContaining({
          state: expect.objectContaining({
            isInvalid: false,
            errorMessage: '',
            currentValue: 60,
            initialValue: 60,
            defaultValue: '',
            touched: false,
            dirty: false,
          }),
        }),
      })
    );
  });

  it('Schema with nested objects: form state match object when form is filled', async () => {
    const formHandler = useFormHandler(yupSchema(contactSchema));
    await formHandler.fillForm({ contact: { name: 'John', age: 28 } });
    expect(formHandler.getFormState()).toEqual(
      expect.objectContaining({
        contact: expect.objectContaining({
          children: expect.objectContaining({
            name: expect.objectContaining({
              state: expect.objectContaining({
                dataType: 'string',
                isInvalid: false,
                errorMessage: '',
                currentValue: 'John',
                initialValue: 'John',
                defaultValue: '',
                touched: false,
                dirty: false,
              }),
            }),
            age: expect.objectContaining({
              state: expect.objectContaining({
                dataType: 'number',
                isInvalid: false,
                errorMessage: '',
                currentValue: 28,
                initialValue: 28,
                defaultValue: '',
                touched: false,
                dirty: false,
              }),
            }),
          }),
          state: expect.objectContaining({
            dataType: 'object',
            isInvalid: false,
            errorMessage: '',
            cachedValue: undefined,
            currentValue: expect.objectContaining({ name: 'John', age: 28 }),
            defaultValue: expect.objectContaining({ name: '', age: '' }),
            initialValue: expect.objectContaining({ name: 'John', age: 28 }),
            touched: false,
            dirty: false,
            validating: false,
          }),
        }),
      })
    );
  });

  it('Schema with nested objects: form state match object when field value is set', async () => {
    const formHandler = useFormHandler(yupSchema(contactSchema));
    await formHandler.setFieldValue('contact', { name: 'John', age: 28 });

    expect(formHandler.getFormState()).toMatchObject({
      contact: expect.objectContaining({
        state: expect.objectContaining({
          dataType: 'object',
          isInvalid: false,
          errorMessage: '',
          currentValue: expect.objectContaining({ name: 'John', age: 28 }),
          initialValue: '',
          defaultValue: '',
          touched: true,
          dirty: true,
        }),
        children: expect.objectContaining({
          name: expect.objectContaining({
            state: expect.objectContaining({
              dataType: 'string',
              isInvalid: false,
              errorMessage: '',
              currentValue: 'John',
              initialValue: '',
              defaultValue: '',
              touched: true,
              dirty: true,
            }),
          }),
          age: expect.objectContaining({
            state: expect.objectContaining({
              dataType: 'number',
              isInvalid: false,
              errorMessage: '',
              currentValue: 28,
              initialValue: '',
              defaultValue: '',
              touched: true,
              dirty: true,
            }),
          }),
        }),
      }),
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

  it('Fieldsets remove: form data matches the expected object', async () => {
    const formHandler = useFormHandler(yupSchema(personsSchema));
    formHandler.addFieldset();
    formHandler.removeFieldset(0);
    expect(formHandler.formData()).toMatchObject([{ name: '', age: '' }]);
  });

  it('Fieldsets multiples remove: form data matches the expected object', async () => {
    const formHandler = useFormHandler(yupSchema(personsSchema));
    formHandler.addFieldset();
    formHandler.addFieldset();
    formHandler.addFieldset();
    formHandler.addFieldset();
    formHandler.removeFieldset(0);
    formHandler.removeFieldset(2);
    expect(formHandler.formData()).toMatchObject([
      { name: '', age: '' },
      { name: '', age: '' },
      { name: '', age: '' },
    ]);
  });

  it('Fieldsets sort: form data matches the expected object', async () => {
    const formHandler = useFormHandler(yupSchema(personsSchema));
    formHandler.addFieldset();
    formHandler.setFieldDefaultValue('1', { name: 'John', age: 18 });
    formHandler.moveFieldset(1, 0);
    expect(formHandler.formData()).toMatchObject([
      { name: 'John', age: 18 },
      { name: '', age: '' },
    ]);
  });

  it('Fieldsets multiples sorts: form data matches the expected object', async () => {
    const formHandler = useFormHandler(yupSchema(personsSchema));
    formHandler.addFieldset();
    formHandler.setFieldDefaultValue('1', { name: 'John', age: 18 });
    formHandler.addFieldset();
    formHandler.setFieldDefaultValue('2', { name: 'Mary', age: 23 });
    formHandler.addFieldset();
    formHandler.setFieldDefaultValue('3', { name: 'Louis', age: 55 });
    formHandler.addFieldset();
    formHandler.setFieldDefaultValue('4', { name: 'Matt', age: 38 });
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

  it('Nested fieldsets: form is filled and marked as valid', async () => {
    const formHandler = useFormHandler(yupSchema(referralsSchema));
    await formHandler.fillForm({
      hostName: 'John',
      referrals: [{ name: 'Mike', age: 22 }],
    });
    expect(formHandler.isFormInvalid()).toBe(false);
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

  it('Nested fieldsets remove: form data matches the expected object', async () => {
    const formHandler = useFormHandler(yupSchema(referralsSchema));
    formHandler.addFieldset({ basePath: 'referrals' });
    formHandler.setFieldDefaultValue('referrals.1', { name: 'John', age: 18 });
    formHandler.removeFieldset(0, 'referrals');
    expect(formHandler.formData()).toMatchObject({
      referrals: [{ name: 'John', age: 18 }],
    });
  });

  it('Nested fieldsets sort: form data matches the expected object', async () => {
    const formHandler = useFormHandler(yupSchema(referralsSchema));
    formHandler.addFieldset({ basePath: 'referrals' });
    formHandler.setFieldDefaultValue('referrals.1', { name: 'John', age: 18 });
    formHandler.moveFieldset(1, 0, 'referrals');
    expect(formHandler.formData()).toMatchObject({
      referrals: [
        { name: 'John', age: 18 },
        { name: '', age: '' },
      ],
    });
    console.log(formHandler.getFormState());
    expect(formHandler._.getFieldState('referrals.0')).toMatchObject({
      name: {
        __state: true,
        dataType: 'string',
        isInvalid: true,
        errorMessage: '',
        currentValue: 'John',
        initialValue: 'John',
        defaultValue: 'John',
        touched: false,
        dirty: false,
      },
      age: {
        __state: true,
        dataType: 'number',
        isInvalid: true,
        errorMessage: '',
        currentValue: 18,
        initialValue: 18,
        defaultValue: 18,
        touched: false,
        dirty: false,
      },
    });
  });

  it('buildFieldState without default field value.', () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    formHandler._.buildFieldState('name');
    expect(formHandler._.getFieldState('name')).toMatchObject({
      __state: true,
      isInvalid: true,
      dataType: 'string',
      errorMessage: '',
      currentValue: '',
      initialValue: '',
      defaultValue: '',
      touched: false,
      dirty: false,
    });
  });

  it('buildFieldState with default field value.', () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    formHandler.setFieldDefaultValue('name', 'Laura');
    formHandler._.buildFieldState('name');
    expect(formHandler._.getFieldState('name')).toMatchObject({
      __state: true,
      dataType: 'string',
      isInvalid: true,
      errorMessage: '',
      currentValue: 'Laura',
      initialValue: 'Laura',
      defaultValue: 'Laura',
      touched: false,
      dirty: false,
    });
  });

  it('buildFieldState with nested field value.', () => {
    const formHandler = useFormHandler(yupSchema(referralsSchema));
    formHandler.setFieldDefaultValue('referrals', [{ name: 'Laura', age: 18 }]);
    formHandler._.buildFieldState('referrals');
    expect(formHandler._.getFieldState('referrals')).toMatchObject([
      {
        name: {
          __state: true,
          dataType: 'string',
          isInvalid: true,
          errorMessage: '',
          currentValue: 'Laura',
          initialValue: 'Laura',
          defaultValue: 'Laura',
          touched: false,
          dirty: false,
        },
        age: {
          __state: true,
          dataType: 'number',
          isInvalid: true,
          errorMessage: '',
          currentValue: 18,
          initialValue: 18,
          defaultValue: 18,
          touched: false,
          dirty: false,
        },
      },
    ]);
  });

  it('Setting field default value predominates after fillForm', async () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    await formHandler.fillForm({ name: 'George', age: 19 });
    formHandler.setFieldDefaultValue('name', 'Laura');
    expect(formHandler.formData()).toMatchObject({ name: 'George', age: 19 });
    expect(formHandler.getFormState()).toMatchObject({
      name: {
        __state: true,
        dataType: 'string',
        isInvalid: false,
        errorMessage: '',
        currentValue: 'George',
        initialValue: 'Laura',
        defaultValue: 'Laura',
        touched: false,
        dirty: false,
      },
      age: {
        __state: true,
        dataType: 'number',
        isInvalid: false,
        errorMessage: '',
        currentValue: 19,
        initialValue: 19,
        defaultValue: '',
        touched: false,
        dirty: false,
      },
    });
  });

  it('Setting field default value predominates after fillForm from a previous resetForm', async () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    await formHandler.fillForm({ name: 'George', age: 19 });
    formHandler.setFieldDefaultValue('name', 'Laura');
    formHandler.resetForm();
    await formHandler.fillForm({ name: 'George', age: 19 });
    expect(formHandler.formData()).toMatchObject({ name: 'George', age: 19 });
    expect(formHandler.getFormState()).toMatchObject({
      name: {
        __state: true,
        dataType: 'string',
        isInvalid: false,
        errorMessage: '',
        currentValue: 'George',
        initialValue: 'George',
        defaultValue: 'Laura',
        touched: false,
        dirty: false,
      },
      age: {
        __state: true,
        dataType: 'number',
        isInvalid: false,
        errorMessage: '',
        currentValue: 19,
        initialValue: 19,
        defaultValue: '',
        touched: false,
        dirty: false,
      },
    });
  });

  it('Value is mapped after automatic parse on setting value', async () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    await formHandler.setFieldValue('age', 2e3);
    expect(formHandler.getFieldValue('age')).toBe(2000);
    await formHandler.setFieldValue('age', 2e3, { mapValue: (value) => value.toExponential() });
    expect(expect(formHandler.getFieldValue('age')).toBe('2e+3'));
  });

  it('Value is mapped after automatic parse on setting default value', async () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    formHandler.setFieldDefaultValue('age', 2e3);
    expect(formHandler.getFieldValue('age')).toBe(2000);
    formHandler.setFieldDefaultValue('age', 2e3, { mapValue: (value) => value.toExponential() });
    expect(expect(formHandler.getFieldValue('age')).toBe('2e+3'));
  });

  it('Validation result is an empty array when silent validation is active', async () => {
    const formHandler = useFormHandler(yupSchema(personSchema), { silentValidation: true });
    try {
      await formHandler.validateForm();
    } catch (error) {
      if (error instanceof FormErrorsException) {
        expect(error.validationResult).toMatchObject([]);
      }
    }
  });

  it('No error message is generated when silent validation is active', async () => {
    const formHandler = useFormHandler(yupSchema(personSchema), { silentValidation: true });
    await formHandler.setFieldValue('name', '');
    expect(formHandler.getFieldError('name')).toBe('');
  });

  it('Checks if has event types', async () => {
    const formHandler = useFormHandler(yupSchema(personSchema), { validateOn: ['input'] });
    expect(formHandler._.hasEventTypes(undefined)).toBe(false);
    expect(formHandler._.hasEventTypes([])).toBe(false);
    expect(formHandler._.hasEventTypes(['noRegisteredEvent'])).toBe(false);
    expect(formHandler._.hasEventTypes(['input'])).toBe(true);
  });

  it('Validates on specific event type', async () => {
    const formHandler = useFormHandler(yupSchema(personSchema), { validateOn: ['input'] });
    await formHandler.setFieldValue('name', '');
    expect(formHandler.getFieldError('name')).toBe('name is a required field');
    await formHandler.setFieldValue('name', '', { validateOn: ['input'] });
    expect(formHandler.getFieldError('name')).toBe('name is a required field');
    await formHandler.setFieldValue('age', '', { validateOn: ['noRegisteredEvent'] });
    expect(formHandler.getFieldError('age')).toBe('');
  });

  it("Form doesn't have changes after fill form", async () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    await formHandler.fillForm({ name: 'John', age: 22 });
    expect(formHandler.formHasChanges()).toBe(false);
  });

  it("Form doesn't have changes after changing but then going back to initial value", async () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    await formHandler.setFieldValue('name', 'John');
    expect(formHandler.formHasChanges()).toBe(true);
    await formHandler.setFieldValue('name', '');
    expect(formHandler.formHasChanges()).toBe(false);
  });

  it('Current value is initialized with default value after reset when default value is given', async () => {
    const formHandler = useFormHandler(yupSchema(personSchema));
    formHandler.setFieldDefaultValue('age', 22);
    await formHandler.resetForm();
    expect(formHandler._.getFieldState('age')).toMatchObject({
      __state: true,
      dataType: 'number',
      isInvalid: false,
      errorMessage: '',
      currentValue: 22,
      initialValue: 22,
      defaultValue: 22,
      touched: false,
      dirty: false,
    });
  });

  it('Validates the whole form despite the given event types', async () => {
    const formHandler = useFormHandler(yupSchema(personSchema), { validateOn: ['input'] });
    try {
      await formHandler.validateForm();
    } catch (error) {
      expect(formHandler.isFormInvalid()).toBe(true);
      if (error instanceof FormErrorsException) {
        expect(error.validationResult).toEqual(
          expect.arrayContaining([
            {
              path: 'age',
              errorMessage: 'age is a required field',
            },
            {
              path: 'name',
              errorMessage: 'name is a required field',
            },
          ])
        );
      }
    }
  });

  it('Triggers are set as expected', async () => {
    const formHandler = useFormHandler(yupSchema(triggersSchema));
    await formHandler.setFieldTriggers('password', ['passwordConfirm']);
    await formHandler.setFieldTriggers('passwordConfirm', ['password']);
    expect(formHandler._.getFieldState('password')?.triggers).toMatchObject(['passwordConfirm']);
    expect(formHandler._.getFieldState('passwordConfirm')?.triggers).toMatchObject(['password']);
  });

  it('Dependant validation is not run if dependant field is not touched', async () => {
    const formHandler = useFormHandler(yupSchema(triggersSchema));
    await formHandler.setFieldTriggers('password', ['passwordConfirm']);
    await formHandler.setFieldTriggers('passwordConfirm', ['password']);
    await formHandler.setFieldValue('password', 'abc');
    expect(formHandler.getFieldError('password')).toBe("Password doesn't match");
    expect(formHandler.getFieldError('passwordConfirm')).toBe('');
  });

  it('Dependant validation is run if dependant field is touched', async () => {
    const formHandler = useFormHandler(yupSchema(triggersSchema));
    await formHandler.setFieldTriggers('password', ['passwordConfirm']);
    await formHandler.setFieldTriggers('passwordConfirm', ['password']);
    await formHandler.setFieldValue('password', 'abc');
    await formHandler.setFieldValue('passwordConfirm', 'ab');
    await formHandler.setFieldValue('password', 'ab');
    expect(formHandler.getFieldError('password')).toBe('');
    expect(formHandler.getFieldError('passwordConfirm')).toBe('');
  });

  it('Dependant validation is run with delay', async () => {
    const formHandler = useFormHandler(yupSchema(triggersSchema), { delay: 200 });
    await formHandler.setFieldTriggers('password', ['passwordConfirm']);
    await formHandler.setFieldTriggers('passwordConfirm', ['password']);
    await formHandler.setFieldValue('password', 'abc', { delay: 100 });
    await formHandler.setFieldValue('passwordConfirm', 'ab', { delay: 150 });
    expect(formHandler.getFieldError('password')).toBe("Password doesn't match");
    expect(formHandler.getFieldError('passwordConfirm')).toBe("Password doesn't match");
  });

  it('Form can be validated with configured triggers', async () => {
    const formHandler = useFormHandler(yupSchema(triggersSchema), { delay: 200 });
    await formHandler.setFieldTriggers('password', ['passwordConfirm']);
    await formHandler.setFieldTriggers('passwordConfirm', ['password']);
    await formHandler.setFieldValue('password', 'abc');
    await formHandler.setFieldValue('passwordConfirm', 'abc');
    try {
      await formHandler.validateForm();
    } finally {
      expect(formHandler.isFormInvalid()).toBe(false);
    }
  });

  it('Form can be reset with configured triggers', async () => {
    const formHandler = useFormHandler(yupSchema(triggersSchema), { delay: 200 });
    await formHandler.setFieldTriggers('password', ['passwordConfirm']);
    await formHandler.setFieldTriggers('passwordConfirm', ['password']);
    await formHandler.setFieldValue('password', 'abc');
    await formHandler.setFieldValue('passwordConfirm', 'abc');
    await formHandler.resetForm();
    expect(formHandler.formData()).toMatchObject({ password: '', passwordConfirm: '' });
    expect(formHandler.getFormErrors()).toMatchObject([]);
  });

  it('Gets the value from a nested object', async () => {
    const formHandler = useFormHandler(yupSchema(referralsSchema));
    await formHandler.setFieldValue('referrals', [{ name: 'John' }]);
    expect(formHandler.getFieldValue('referrals')).toMatchObject([{ name: 'John' }]);
  });

  it('Gets the default value from a nested object', () => {
    const formHandler = useFormHandler(yupSchema(referralsSchema));
    formHandler.setFieldDefaultValue('referrals', [{ name: 'John' }]);
    expect(formHandler.getFieldDefaultValue('referrals')).toMatchObject([{ name: 'John' }]);
  });

  it('Error message for nested object', async () => {
    const formHandler = useFormHandler(yupSchema(contactSchema));
    await formHandler.validateField('contact');
    expect(formHandler.getFieldError('contact')).toBe('age is a required field, contact.name is a required field');
  });

  it('Field state for touched nested object', () => {
    const formHandler = useFormHandler(yupSchema(contactSchema));
    formHandler.touchField('contact');
    expect(formHandler._.getFieldState('contact')).toMatchObject({
      age: {
        __state: true,
        dataType: 'number',
        isInvalid: true,
        errorMessage: '',
        cachedValue: undefined,
        currentValue: '',
        defaultValue: '',
        initialValue: '',
        touched: true,
        dirty: false,
        triggers: undefined,
        validating: false,
      },
      name: {
        __state: true,
        dataType: 'string',
        isInvalid: true,
        errorMessage: '',
        cachedValue: undefined,
        currentValue: '',
        defaultValue: '',
        initialValue: '',
        touched: true,
        dirty: false,
        triggers: undefined,
        validating: false,
      },
    });
  });

  it('Field state for nested object with triggers', async () => {
    const formHandler = useFormHandler(yupSchema(contactSchema));
    await formHandler.setFieldTriggers('contact', []);
    expect(formHandler._.getFieldState('contact')).toMatchObject({
      age: {
        __state: true,
        dataType: 'number',
        isInvalid: true,
        errorMessage: '',
        cachedValue: undefined,
        currentValue: '',
        defaultValue: '',
        initialValue: '',
        touched: false,
        dirty: false,
        triggers: [],
        validating: false,
      },
      name: {
        __state: true,
        dataType: 'string',
        isInvalid: true,
        errorMessage: '',
        cachedValue: undefined,
        currentValue: '',
        defaultValue: '',
        initialValue: '',
        touched: false,
        dirty: false,
        triggers: [],
        validating: false,
      },
    });
  });

  it('form must fail expecting 2 primitives', async () => {
    const formHandler = useFormHandler(yupSchema(countriesSchema));
    await formHandler.setFieldValue('countries', [1]);

    try {
      await formHandler.validateForm();
    } catch (error) {
      if (error instanceof FormErrorsException) {
        expect(error.validationResult).toEqual(
          expect.arrayContaining([
            {
              path: 'countries',
              errorMessage: 'Array must contain at least 2 element(s)',
            },
          ])
        );
      }
    }

    expect(formHandler.isFormInvalid()).toBe(true);
  });

  it('form must fail expecting 2 objects', async () => {
    let validationResult: FormFieldError[] = [];
    const formHandler = useFormHandler(yupSchema(countriesObjSchema));
    await formHandler.setFieldValue('countries', [{ name: 'Colombia' }]);

    try {
      await formHandler.validateForm();
    } catch (error) {
      if (error instanceof FormErrorsException) {
        validationResult = error.validationResult;
      }
    }

    console.log(formHandler.getFormState());

    expect(validationResult).toEqual(
      expect.arrayContaining([
        {
          path: 'countries',
          errorMessage: 'Array must contain at least 2 element(s)',
        },
      ])
    );
  });
});
