import { CHILDREN_KEY, DATA_CONTAINS_ERRORS, ROOT_KEY, STATE_KEY } from '@constants';
import { useFormHandler } from '@hooks';
import { ErrorMap } from '@interfaces';
import { FormErrorsException } from '@utils';
import {
  yupSchemas,
  ValidationSchemas,
  TWO_COUNTRIES_EXPECTED,
  AGE_IS_REQUIRED,
  NAME_IS_REQUIRED,
  zodSchemas,
} from './mocks';

const testSuite = ({
  personSchema,
  contactSchema,
  personsSchema,
  referralsSchema,
  triggersSchema,
  countriesSchema,
  countriesObjSchema,
}: ValidationSchemas) => {
  it('formHandler object must be defined', () => {
    const formHandler = useFormHandler(personSchema);
    expect(formHandler).toBeDefined();
  });

  it('If field path is no provided, the returned value is an empty string', () => {
    const formHandler = useFormHandler(personSchema);
    formHandler.setFieldValue('', 'George');
    expect(formHandler.getFieldValue('name')).toBe('');
  });

  it('Required name value, must be valid', async () => {
    const formHandler = useFormHandler(personSchema);
    await formHandler.setFieldValue('name', 'George');
    expect(formHandler.getFieldError('name')).toBe('');
    expect(formHandler.isFieldInvalid('name')).toBe(false);
  });

  it('Required name value, must be invalid', async () => {
    const formHandler = useFormHandler(personSchema);
    await formHandler.setFieldValue('name', '');
    expect(formHandler.getFieldError('name')).toBe(NAME_IS_REQUIRED);
    expect(formHandler.isFieldInvalid('name')).toBe(true);
  });

  it('is form invalid', async () => {
    const formHandler = useFormHandler(personSchema);
    try {
      await formHandler.validateForm();
    } catch (error) {
      expect(formHandler.isFormInvalid()).toBe(true);
      if (error instanceof FormErrorsException) {
        expect(error.validationResult).toEqual(
          expect.arrayContaining([
            {
              path: 'age',
              message: AGE_IS_REQUIRED,
            },
            {
              path: 'name',
              message: NAME_IS_REQUIRED,
            },
          ])
        );
      }
    }
  });

  it('is form valid', async () => {
    const formHandler = useFormHandler(personSchema);
    await formHandler.setFieldValue('name', 'George');
    await formHandler.setFieldValue('age', 60);
    await formHandler.validateForm();
    expect(formHandler.isFormInvalid()).toBe(false);
  });

  it('Form data matches the set data', async () => {
    const formHandler = useFormHandler(personSchema);
    formHandler.setFieldValue('name', 'George');
    formHandler.setFieldValue('age', 60);
    expect(formHandler.formData()).toMatchObject({ name: 'George', age: 60 });
  });

  it('Form has changes', async () => {
    const formHandler = useFormHandler(personSchema);
    await formHandler.setFieldValue('name', 'George');
    expect(formHandler.formHasChanges()).toBe(true);
  });

  it("Form doesn't have changes", async () => {
    const formHandler = useFormHandler(personSchema);
    await formHandler.fillForm({ name: 'George', age: 19 });
    await formHandler.setFieldValue('name', 'George');
    expect(formHandler.formHasChanges()).toBe(false);
  });

  it('form is filled', async () => {
    const formHandler = useFormHandler(personSchema);
    await formHandler.fillForm({ name: 'George', age: 60 });
    expect(formHandler.formData()).toMatchObject({ name: 'George', age: 60 });
  });

  it('field state is updated as expected', () => {
    const formHandler = useFormHandler(personSchema);
    formHandler._.setFieldState('name', { dirty: true });
    expect(formHandler._.getFieldState('name')).toEqual(
      expect.objectContaining({
        dirty: true,
      })
    );
  });

  it('field state is updated when added a fieldset', () => {
    const formHandler = useFormHandler(personsSchema);
    formHandler.addFieldset();
    expect(formHandler._.getFieldState('1.name')).toEqual(
      expect.objectContaining({
        isInvalid: true,
      })
    );
  });

  it('form state match object when form is filled', async () => {
    const formHandler = useFormHandler(personSchema);
    await formHandler.fillForm({ name: 'George', age: 60 });
    expect(formHandler.getFieldValue('name')).toBe('George');
    expect(formHandler.getFieldValue('age')).toBe(60);
    expect(formHandler._.getFormState()).toEqual({
      [ROOT_KEY]: expect.objectContaining({
        [STATE_KEY]: expect.objectContaining({
          dataType: 'object',
          isInvalid: false,
          errorMessage: '',
          currentValue: { age: 60, name: 'George' },
          defaultValue: { age: '', name: '' },
          initialValue: { age: 60, name: 'George' },
          touched: false,
          dirty: false,
          validating: false,
        }),
        [CHILDREN_KEY]: expect.objectContaining({
          name: expect.objectContaining({
            [STATE_KEY]: expect.objectContaining({
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
            [STATE_KEY]: expect.objectContaining({
              isInvalid: false,
              errorMessage: '',
              currentValue: 60,
              initialValue: 60,
              defaultValue: '',
              touched: false,
              dirty: false,
            }),
          }),
        }),
      }),
    });
    expect(formHandler.formData()).toMatchObject({ age: 60, name: 'George' });
  });

  it('Schema with nested objects: form state match object when form is filled', async () => {
    const formHandler = useFormHandler(contactSchema);
    await formHandler.fillForm({ contact: { name: 'John', age: 28 } });
    expect(formHandler.getFieldValue('contact')).toMatchObject({ name: 'John', age: 28 });
    expect(formHandler.getFieldValue('contact.name')).toBe('John');
    expect(formHandler.getFieldValue('contact.age')).toBe(28);

    expect(formHandler._.getFormState()).toEqual(
      expect.objectContaining({
        [ROOT_KEY]: expect.objectContaining({
          [STATE_KEY]: expect.objectContaining({
            dataType: 'object',
            isInvalid: false,
            errorMessage: '',
            currentValue: expect.objectContaining({ contact: { name: 'John', age: 28 } }),
            defaultValue: expect.objectContaining({ contact: { name: '', age: '' } }),
            initialValue: expect.objectContaining({ contact: { name: 'John', age: 28 } }),
            touched: false,
            dirty: false,
            validating: false,
          }),
          [CHILDREN_KEY]: {
            contact: expect.objectContaining({
              [STATE_KEY]: expect.objectContaining({
                dataType: 'object',
                isInvalid: false,
                errorMessage: '',
                currentValue: expect.objectContaining({ name: 'John', age: 28 }),
                defaultValue: expect.objectContaining({ name: '', age: '' }),
                initialValue: expect.objectContaining({ name: 'John', age: 28 }),
                touched: false,
                dirty: false,
                validating: false,
              }),
              [CHILDREN_KEY]: expect.objectContaining({
                name: expect.objectContaining({
                  [STATE_KEY]: expect.objectContaining({
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
                  [STATE_KEY]: expect.objectContaining({
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
            }),
          },
        }),
      })
    );
  });

  it('Schema with nested objects: form state match object when field value is set', async () => {
    const formHandler = useFormHandler(contactSchema);
    await formHandler.setFieldValue('contact', { name: 'John', age: 28 });
    expect(formHandler.getFieldValue('contact')).toMatchObject({ name: 'John', age: 28 });
    expect(formHandler.getFieldValue('contact.name')).toBe('John');
    expect(formHandler.getFieldValue('contact.age')).toBe(28);
    expect(formHandler._.getFormState()).toMatchObject(
      expect.objectContaining({
        [ROOT_KEY]: expect.objectContaining({
          [STATE_KEY]: expect.objectContaining({
            dataType: 'object',
            isInvalid: false,
            errorMessage: '',
            currentValue: expect.objectContaining({ contact: { name: 'John', age: 28 } }),
            defaultValue: expect.objectContaining({ contact: { name: '', age: '' } }),
            initialValue: expect.objectContaining({ contact: { name: '', age: '' } }),
            touched: false,
            dirty: true,
            validating: false,
          }),
          [CHILDREN_KEY]: {
            contact: expect.objectContaining({
              [STATE_KEY]: expect.objectContaining({
                dataType: 'object',
                isInvalid: false,
                errorMessage: '',
                currentValue: expect.objectContaining({ name: 'John', age: 28 }),
                defaultValue: expect.objectContaining({ name: '', age: '' }),
                initialValue: expect.objectContaining({ name: '', age: '' }),
                touched: true,
                dirty: true,
                validating: false,
              }),
              [CHILDREN_KEY]: expect.objectContaining({
                name: expect.objectContaining({
                  [STATE_KEY]: expect.objectContaining({
                    dataType: 'string',
                    isInvalid: false,
                    errorMessage: '',
                    currentValue: 'John',
                    initialValue: '',
                    defaultValue: '',
                    touched: false,
                    dirty: true,
                  }),
                }),
                age: expect.objectContaining({
                  [STATE_KEY]: expect.objectContaining({
                    dataType: 'number',
                    isInvalid: false,
                    errorMessage: '',
                    currentValue: 28,
                    initialValue: '',
                    defaultValue: '',
                    touched: false,
                    dirty: true,
                  }),
                }),
              }),
            }),
          },
        }),
      })
    );
  });

  it('Fieldsets: default form data must be an array of 1 record', () => {
    const formHandler = useFormHandler(personsSchema);
    expect(formHandler.formData()).toMatchObject([{ name: '', age: '' }]);
  });

  it('Fieldsets add: form data matches the expected object', async () => {
    const formHandler = useFormHandler(personsSchema);
    formHandler.addFieldset();
    expect(formHandler.formData()).toMatchObject([
      { name: '', age: '' },
      { name: '', age: '' },
    ]);
  });

  it('Fieldsets multiple adds: form data matches the expected object', async () => {
    const formHandler = useFormHandler(personsSchema);
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
    const formHandler = useFormHandler(personsSchema);
    formHandler.addFieldset();
    formHandler.removeFieldset(0);
    expect(formHandler.formData()).toMatchObject([{ name: '', age: '' }]);
  });

  it('Fieldsets multiples remove: form data matches the expected object', async () => {
    const formHandler = useFormHandler(personsSchema);
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
    const formHandler = useFormHandler(personsSchema);
    formHandler.addFieldset();
    await formHandler.setFieldDefaultValue('1', { name: 'John', age: 18 });
    formHandler.moveFieldset(1, 0);
    expect(formHandler.formData()).toMatchObject([
      { name: 'John', age: 18 },
      { name: '', age: '' },
    ]);
  });

  it('Fieldsets multiples sorts: form data matches the expected object', async () => {
    const formHandler = useFormHandler(personsSchema);
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
    const formHandler = useFormHandler(referralsSchema);
    await formHandler.fillForm({
      hostName: 'John',
      referrals: [{ name: 'Mike', age: 22 }],
    });
    expect(formHandler.isFormInvalid()).toBe(false);
  });

  it('Nested fieldsets: default form data must be an array of 1 record', () => {
    const formHandler = useFormHandler(referralsSchema);
    expect(formHandler.formData().referrals).toMatchObject([{ name: '', age: '' }]);
  });

  it('Nested fieldsets add: form data matches the expected object', async () => {
    const formHandler = useFormHandler(referralsSchema);
    formHandler.addFieldset({ basePath: 'referrals' });
    expect(formHandler.formData()).toMatchObject({
      referrals: [
        { name: '', age: '' },
        { name: '', age: '' },
      ],
    });
  });

  it('Nested fieldsets remove: form data matches the expected object', async () => {
    const formHandler = useFormHandler(referralsSchema);
    formHandler.addFieldset({ basePath: 'referrals' });
    formHandler.setFieldDefaultValue('referrals.1', { name: 'John', age: 18 });
    expect(formHandler.formData()).toMatchObject({
      referrals: [
        { name: '', age: '' },
        { name: 'John', age: 18 },
      ],
    });
    expect(formHandler.getFieldDefaultValue('referrals')).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'John', age: 18 })])
    );
    formHandler.removeFieldset(0, 'referrals');
    expect(formHandler.formData()).toMatchObject({
      referrals: [{ name: 'John', age: 18 }],
    });
  });

  it('Nested fieldsets sort: form data matches the expected object', async () => {
    const formHandler = useFormHandler(referralsSchema);
    formHandler.addFieldset({ basePath: 'referrals' });
    await formHandler.setFieldDefaultValue('referrals.1', { name: 'John', age: 18 });
    formHandler.moveFieldset(1, 0, 'referrals');
    expect(formHandler.formData()).toMatchObject({
      referrals: [
        { name: 'John', age: 18 },
        { name: '', age: '' },
      ],
    });

    expect(formHandler._.getFieldState('referrals.0')).toEqual(
      expect.objectContaining({
        dataType: 'array',
        isInvalid: true,
        errorMessage: '',
        initialValue: expect.arrayContaining([expect.objectContaining({ name: 'John', age: 18 })]),
        defaultValue: expect.arrayContaining([expect.objectContaining({ name: 'John', age: 18 })]),
        touched: false,
        dirty: false,
      })
    );
  });

  it('buildFieldState without default field value.', () => {
    const formHandler = useFormHandler(personSchema);
    formHandler._.buildFieldState('name');
    expect(formHandler._.getFieldState('name')).toEqual(
      expect.objectContaining({
        isInvalid: true,
        dataType: 'string',
        errorMessage: '',
        initialValue: '',
        defaultValue: '',
        touched: false,
        dirty: false,
      })
    );
  });

  it('buildFieldState with default field value.', () => {
    const formHandler = useFormHandler(personSchema);
    formHandler.setFieldDefaultValue('name', 'Laura');
    formHandler._.buildFieldState('name');
    expect(formHandler._.getFieldState('name')).toMatchObject({
      dataType: 'string',
      isInvalid: true,
      errorMessage: '',
      initialValue: 'Laura',
      defaultValue: 'Laura',
      touched: false,
      dirty: false,
    });
  });

  it('buildFieldState with nested field value.', () => {
    const formHandler = useFormHandler(referralsSchema);
    formHandler.setFieldDefaultValue('referrals', [{ name: 'Laura', age: 18 }]);
    formHandler._.buildFieldState('referrals');
    expect(formHandler._.getFieldState('referrals')).toEqual(
      expect.objectContaining({
        dataType: 'array',
        isInvalid: true,
        errorMessage: '',
        initialValue: expect.arrayContaining([expect.objectContaining({ name: 'Laura', age: 18 })]),
        defaultValue: expect.arrayContaining([expect.objectContaining({ name: 'Laura', age: 18 })]),
        touched: false,
        dirty: false,
      })
    );
  });

  it('Setting field default value predominates after fillForm', async () => {
    const formHandler = useFormHandler(personSchema);
    await formHandler.fillForm({ name: 'George', age: 19 });
    await formHandler.setFieldDefaultValue('name', 'Laura');
    expect(formHandler.formData()).toMatchObject({ name: 'George', age: 19 });
    expect(formHandler._.getFormState()).toEqual(
      expect.objectContaining({
        [ROOT_KEY]: expect.objectContaining({
          [CHILDREN_KEY]: expect.objectContaining({
            name: expect.objectContaining({
              [STATE_KEY]: expect.objectContaining({
                dataType: 'string',
                isInvalid: false,
                errorMessage: '',
                currentValue: 'George',
                initialValue: 'George',
                defaultValue: 'Laura',
                touched: false,
                dirty: false,
              }),
            }),
            age: expect.objectContaining({
              [STATE_KEY]: expect.objectContaining({
                dataType: 'number',
                isInvalid: false,
                errorMessage: '',
                currentValue: 19,
                initialValue: 19,
                defaultValue: '',
                touched: false,
                dirty: false,
              }),
            }),
          }),
        }),
      })
    );
  });

  it('Setting field default value predominates after fillForm from a previous resetForm', async () => {
    const formHandler = useFormHandler(personSchema);
    await formHandler.fillForm({ name: 'George', age: 19 });
    formHandler.setFieldDefaultValue('name', 'Laura');
    formHandler.resetForm();
    await formHandler.fillForm({ name: 'George', age: 19 });
    expect(formHandler.formData()).toMatchObject({ name: 'George', age: 19 });
    expect(formHandler._.getFormState()).toEqual(
      expect.objectContaining({
        [ROOT_KEY]: expect.objectContaining({
          [STATE_KEY]: expect.objectContaining({
            dataType: 'object',
            isInvalid: false,
            errorMessage: '',
            currentValue: { age: 19, name: 'George' },
            defaultValue: { age: '', name: 'Laura' },
            initialValue: { age: 19, name: 'George' },
            touched: false,
            dirty: false,
            validating: false,
          }),
          [CHILDREN_KEY]: expect.objectContaining({
            name: expect.objectContaining({
              [STATE_KEY]: expect.objectContaining({
                dataType: 'string',
                isInvalid: false,
                errorMessage: '',
                currentValue: 'George',
                initialValue: 'George',
                defaultValue: 'Laura',
                touched: false,
                dirty: false,
              }),
            }),
            age: expect.objectContaining({
              [STATE_KEY]: expect.objectContaining({
                dataType: 'number',
                isInvalid: false,
                errorMessage: '',
                currentValue: 19,
                initialValue: 19,
                defaultValue: '',
                touched: false,
                dirty: false,
              }),
            }),
          }),
        }),
      })
    );
  });

  it('Value is mapped after automatic parse on setting value', async () => {
    const formHandler = useFormHandler(personSchema);
    await formHandler.setFieldValue('age', 2e3);
    expect(formHandler.getFieldValue('age')).toBe(2000);
    await formHandler.setFieldValue('age', 2e3, { mapValue: (value) => value.toExponential() });
    expect(expect(formHandler.getFieldValue('age')).toBe('2e+3'));
  });

  it('Value is mapped after automatic parse on setting default value', async () => {
    const formHandler = useFormHandler(personSchema);
    formHandler.setFieldDefaultValue('age', 2e3, { mapValue: (value) => value.toExponential() });
    expect(expect(formHandler.getFieldValue('age')).toBe('2e+3'));
  });

  it('Validation result contains errors despite silent validation is active', async () => {
    const formHandler = useFormHandler(personSchema, { silentValidation: true });
    let errors: ErrorMap = [];
    try {
      await formHandler.validateForm();
    } catch (error) {
      if (error instanceof FormErrorsException) {
        errors = error.validationResult;
      }
    }
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'name', message: NAME_IS_REQUIRED }),
        expect.objectContaining({ path: 'age', message: AGE_IS_REQUIRED }),
        expect.objectContaining({ path: ROOT_KEY, message: DATA_CONTAINS_ERRORS }),
      ])
    );
  });

  it('No error message is generated when silent validation is active', async () => {
    const formHandler = useFormHandler(personSchema, { silentValidation: true });
    await formHandler.setFieldValue('name', '');
    expect(formHandler.getFieldError('name')).toBe('');
  });

  it('Checks if has event types', async () => {
    const formHandler = useFormHandler(personSchema, { validateOn: ['input'] });
    expect(formHandler._.hasEventTypes(undefined)).toBe(false);
    expect(formHandler._.hasEventTypes([])).toBe(false);
    expect(formHandler._.hasEventTypes(['noRegisteredEvent'])).toBe(false);
    expect(formHandler._.hasEventTypes(['input'])).toBe(true);
  });

  it('Validates on specific event type', async () => {
    const formHandler = useFormHandler(personSchema, { validateOn: ['input'] });
    await formHandler.setFieldValue('name', '');
    expect(formHandler.getFieldError('name')).toBe(NAME_IS_REQUIRED);
    await formHandler.setFieldValue('name', '', { validateOn: ['input'] });
    expect(formHandler.getFieldError('name')).toBe(NAME_IS_REQUIRED);
    await formHandler.setFieldValue('age', '', { validateOn: ['noRegisteredEvent'] });
    expect(formHandler.getFieldError('age')).toBe('');
  });

  it("Form doesn't have changes after fill form", async () => {
    const formHandler = useFormHandler(personSchema);
    await formHandler.fillForm({ name: 'John', age: 22 });
    expect(formHandler.formHasChanges()).toBe(false);
  });

  it("Form doesn't have changes after changing but then going back to initial value", async () => {
    const formHandler = useFormHandler(personSchema);
    await formHandler.setFieldValue('name', 'John');
    expect(formHandler.formHasChanges()).toBe(true);
    await formHandler.setFieldValue('name', '');
    expect(formHandler.formHasChanges()).toBe(false);
  });

  it('Current value is initialized with default value after reset when default value is given', async () => {
    const formHandler = useFormHandler(personSchema);
    await formHandler.setFieldDefaultValue('age', 22);
    await formHandler.resetForm();
    expect(formHandler._.getFieldState('age')).toMatchObject({
      dataType: 'number',
      isInvalid: false,
      errorMessage: '',
      initialValue: 22,
      defaultValue: 22,
      touched: false,
      dirty: false,
    });
    expect(formHandler.formData()).toMatchObject({ age: 22, name: '' });
  });

  it('Validates the whole form despite the given event types', async () => {
    const formHandler = useFormHandler(personSchema, { validateOn: ['input'] });
    let errors: ErrorMap = [];

    try {
      await formHandler.validateForm();
    } catch (error) {
      expect(formHandler.isFormInvalid()).toBe(true);
      if (error instanceof FormErrorsException) {
        errors = error.validationResult;
      }
    }

    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: 'age',
          message: AGE_IS_REQUIRED,
        }),
        expect.objectContaining({
          path: 'name',
          message: NAME_IS_REQUIRED,
        }),
        expect.objectContaining({
          path: ROOT_KEY,
          message: DATA_CONTAINS_ERRORS,
        }),
      ])
    );
  });

  it('Triggers are set as expected', async () => {
    const formHandler = useFormHandler(triggersSchema);
    await formHandler.setFieldTriggers('password', ['passwordConfirm']);
    await formHandler.setFieldTriggers('passwordConfirm', ['password']);
    expect(formHandler._.getFieldState('password')?.triggers).toMatchObject(['passwordConfirm']);
    expect(formHandler._.getFieldState('passwordConfirm')?.triggers).toMatchObject(['password']);
  });

  it('Dependant validation is not run if dependant field is not touched', async () => {
    const formHandler = useFormHandler(triggersSchema);
    await formHandler.setFieldTriggers('password', ['passwordConfirm']);
    await formHandler.setFieldTriggers('passwordConfirm', ['password']);
    await formHandler.setFieldValue('password', 'abc');
    expect(formHandler.getFieldError('password')).toBe("Password doesn't match");
    expect(formHandler.getFieldError('passwordConfirm')).toBe('');
  });

  it('Dependant validation is run if dependant field is touched', async () => {
    const formHandler = useFormHandler(triggersSchema);
    await formHandler.setFieldTriggers('password', ['passwordConfirm']);
    await formHandler.setFieldTriggers('passwordConfirm', ['password']);
    await formHandler.setFieldValue('password', 'abc');
    await formHandler.setFieldValue('passwordConfirm', 'ab');
    await formHandler.setFieldValue('password', 'ab');
    expect(formHandler.getFieldError('password')).toBe('');
    expect(formHandler.getFieldError('passwordConfirm')).toBe('');
  });

  it('Dependant validation is run with delay', async () => {
    const formHandler = useFormHandler(triggersSchema, { delay: 200 });
    await formHandler.setFieldTriggers('password', ['passwordConfirm']);
    await formHandler.setFieldTriggers('passwordConfirm', ['password']);
    await formHandler.setFieldValue('password', 'abc', { delay: 100 });
    await formHandler.setFieldValue('passwordConfirm', 'ab', { delay: 150 });
    expect(formHandler.getFieldError('password')).toBe("Password doesn't match");
    expect(formHandler.getFieldError('passwordConfirm')).toBe("Password doesn't match");
  });

  it('Form can be validated with configured triggers', async () => {
    const formHandler = useFormHandler(triggersSchema, { delay: 200 });
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
    const formHandler = useFormHandler(triggersSchema, { delay: 200 });
    await formHandler.setFieldTriggers('password', ['passwordConfirm']);
    await formHandler.setFieldTriggers('passwordConfirm', ['password']);
    await formHandler.setFieldValue('password', 'abc');
    await formHandler.setFieldValue('passwordConfirm', 'abc');
    await formHandler.resetForm();
    expect(formHandler.formData()).toMatchObject({ password: '', passwordConfirm: '' });
    expect(formHandler.getFormErrors()).toMatchObject([]);
  });

  it('Gets the value from a nested object', async () => {
    const formHandler = useFormHandler(referralsSchema);
    await formHandler.setFieldValue('referrals', [{ name: 'John' }]);
    expect(formHandler.getFieldValue('referrals')).toMatchObject([{ name: 'John' }]);
  });

  it('Gets the default value from a nested object', () => {
    const formHandler = useFormHandler(referralsSchema);
    formHandler.setFieldDefaultValue('referrals', [{ name: 'John' }]);
    expect(formHandler.getFieldDefaultValue('referrals')).toMatchObject([{ name: 'John' }]);
  });

  it('Error message for nested object', async () => {
    const formHandler = useFormHandler(contactSchema);
    await formHandler.validateField('contact');
    expect(formHandler.getFieldError('contact')).not.toBe('');
  });

  it('Field state for touched nested object', () => {
    const formHandler = useFormHandler(contactSchema);
    formHandler.touchField('contact');
    expect(formHandler._.getFieldState('contact')).toMatchObject({
      touched: true,
    });
  });

  it('Field state for nested object with triggers', async () => {
    const formHandler = useFormHandler(contactSchema);
    await formHandler.setFieldTriggers('contact', []);
    expect(formHandler._.getFieldState('contact')).toEqual(
      expect.objectContaining({
        dataType: 'object',
        isInvalid: true,
        errorMessage: '',
        currentValue: undefined,
        defaultValue: expect.objectContaining({ name: '', age: '' }),
        initialValue: expect.objectContaining({ name: '', age: '' }),
        touched: false,
        dirty: false,
        triggers: expect.objectContaining([]),
        validating: false,
      })
    );
  });

  it('form must fail expecting 2 primitives', async () => {
    const formHandler = useFormHandler(countriesSchema);
    let errors: ErrorMap = [];
    await formHandler.setFieldValue('countries', [1]);

    try {
      await formHandler.validateForm();
    } catch (error) {
      if (error instanceof FormErrorsException) {
        errors = error.validationResult;
      }
    }

    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: 'countries',
          message: TWO_COUNTRIES_EXPECTED,
        }),
        expect.objectContaining({
          path: ROOT_KEY,
          message: DATA_CONTAINS_ERRORS,
        }),
      ])
    );
    expect(formHandler.isFormInvalid()).toBe(true);
  });

  it('form must fail expecting 2 objects', async () => {
    let validationResult: ErrorMap = [];
    const formHandler = useFormHandler(countriesObjSchema);
    await formHandler.setFieldValue('countries', [{ name: 'Colombia' }]);

    try {
      await formHandler.validateForm();
    } catch (error) {
      if (error instanceof FormErrorsException) {
        validationResult = error.validationResult;
      }
    }

    expect(validationResult).toEqual(
      expect.arrayContaining([
        {
          path: 'countries',
          message: 'countries field must have at least 2 items',
        },
      ])
    );
  });

  it('Form state: form state matches the expected object on every operation', async () => {
    const formHandler = useFormHandler(personSchema);
    expect(formHandler._.getFormState()).toEqual(
      expect.objectContaining({
        [ROOT_KEY]: expect.objectContaining({
          [STATE_KEY]: expect.objectContaining({
            dataType: 'object',
            isInvalid: true,
            errorMessage: '',
            defaultValue: {
              name: '',
              age: '',
            },
            initialValue: {
              name: '',
              age: '',
            },
            touched: false,
            dirty: false,
            validating: false,
          }),
          [CHILDREN_KEY]: expect.objectContaining({
            age: expect.objectContaining({
              [STATE_KEY]: expect.objectContaining({
                dataType: 'number',
                isInvalid: true,
                errorMessage: '',
                defaultValue: '',
                initialValue: '',
                touched: false,
                dirty: false,
                validating: false,
              }),
            }),
            name: expect.objectContaining({
              [STATE_KEY]: expect.objectContaining({
                dataType: 'string',
                isInvalid: true,
                errorMessage: '',
                defaultValue: '',
                initialValue: '',
                touched: false,
                dirty: false,
                validating: false,
              }),
            }),
          }),
        }),
      })
    );
    await formHandler.setFieldValue('name', 'Laura');
    expect(formHandler._.getFormState()).toEqual(
      expect.objectContaining({
        [ROOT_KEY]: expect.objectContaining({
          [STATE_KEY]: expect.objectContaining({
            currentValue: {
              name: 'Laura',
              age: '',
            },
          }),
          [CHILDREN_KEY]: expect.objectContaining({
            name: expect.objectContaining({
              [STATE_KEY]: expect.objectContaining({
                currentValue: 'Laura',
              }),
            }),
          }),
        }),
      })
    );
    expect(formHandler.isFieldInvalid(ROOT_KEY)).toBe(true);
    expect(formHandler.isFormInvalid()).toBe(true);
    await formHandler.setFieldValue('age', 18);
    expect(formHandler._.getFormState()).toEqual(
      expect.objectContaining({
        [ROOT_KEY]: expect.objectContaining({
          [STATE_KEY]: expect.objectContaining({
            currentValue: {
              name: 'Laura',
              age: 18,
            },
          }),
          [CHILDREN_KEY]: expect.objectContaining({
            name: expect.objectContaining({
              [STATE_KEY]: expect.objectContaining({
                currentValue: 'Laura',
              }),
            }),
            age: expect.objectContaining({
              [STATE_KEY]: expect.objectContaining({
                currentValue: 18,
              }),
            }),
          }),
        }),
      })
    );
    expect(formHandler.isFieldInvalid(ROOT_KEY)).toBe(false);
    expect(formHandler.isFormInvalid()).toBe(false);
  });
};

describe('useFormHandler with yup', () => {
  testSuite(yupSchemas);
});

describe('useFormHandler with zod', () => {
  testSuite(zodSchemas);
});
