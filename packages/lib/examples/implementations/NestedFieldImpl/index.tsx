import { useFormHandler } from '@hooks';
import { yupSchema, FormErrorsException } from '@utils';
import { Component, createSignal } from 'solid-js';
import * as yup from 'yup';

type Schema = {
  contact: {
    email: string;
    phone: string;
  };
};

const schema: yup.SchemaOf<Schema> = yup.object({
  contact: yup.object().shape({
    email: yup.string().required().email(),
    phone: yup.string().required(),
  }),
});

export const NestedFieldImpl: Component = () => {
  const formHandler = useFormHandler<Schema>(yupSchema(schema));
  const [error, setError] = createSignal('');
  const { formData } = formHandler;

  const onInput = (event: Event) => {
    const { name, value } = event.currentTarget as HTMLInputElement;
    formHandler.setFieldValue(name, value);
  };

  const setContact = () => {
    formHandler.setFieldValue('contact', { email: 'aaa@mail.com', phone: '322 222 22 22' });
  };

  const setContactDefaultValue = () => {
    formHandler.setFieldDefaultValue('contact', { email: 'xxx@mail.com', phone: '311 111 11 11' });
  };

  const fillForm = () => {
    formHandler.fillForm({
      contact: { email: 'test@mail.com', phone: '311 454 43 23' },
    });
  };

  const resetForm = () => {
    formHandler.resetForm();
  };

  const submit = async () => {
    try {
      setError('');
      await formHandler.validateForm();
      alert(`Data submitted \n ${JSON.stringify(formData())}`);
      formHandler.resetForm();
    } catch (error) {
      if (error instanceof FormErrorsException) {
        setError(
          JSON.stringify(
            error.validationResult.map((item) => item.message),
            null,
            2
          )
        );
      }
    }
  };

  return (
    <form>
      <h3>Nested Field Implementation</h3>
      <div style="display: flex">
        <fieldset>
          <legend>Contact</legend>
          <div>
            <label>Email</label>
            <br />
            <input
              data-testid="contact.email"
              name="contact.email"
              onInput={onInput}
              value={formData().contact.email}
            />
            <br />
            <small style="color: red;">{formHandler.getFieldError('contact.email')}</small>
          </div>
          <div>
            <label>Phone</label>
            <br />
            <input
              data-testid="contact.phone"
              name="contact.phone"
              onInput={onInput}
              value={formData().contact.phone}
            ></input>
            <br />
            <small style="color: red;">{formHandler.getFieldError('contact.phone')}</small>
          </div>
          <br />
          <small style="color: red">{formHandler.getFieldError('contact')}</small>
          <br />
          <small data-testId="contact-status">{formHandler.isFieldInvalid('contact') ? 'Invalid' : 'Valid'}</small>
          <button type="button" onClick={setContact}>
            Set Contact
          </button>
          <button type="button" onClick={setContactDefaultValue}>
            Set Contact Default Value
          </button>
        </fieldset>
        <div style="border: 1px solid black; padding: 10px; overflow: auto; height: 400px; margin-left: 30px; min-width: 600px">
          <pre>
            <code>{JSON.stringify(formHandler._.getFormState(), null, 2)}</code>
          </pre>
        </div>
      </div>
      <button data-testid="submit" type="button" onClick={submit} disabled={formHandler.isFormInvalid()}>
        Submit
      </button>
      <br />
      <button data-testid="fill" type="button" onClick={fillForm}>
        Fill default form data
      </button>
      <br />
      <button data-testid="reset" type="button" onClick={resetForm}>
        Reset form
      </button>
      <br />
      <small data-testId="form-status">{formHandler.isFormInvalid() ? 'Invalid' : 'Valid'}</small>
      <pre style="color: red">
        <code>{error()}</code>
      </pre>
    </form>
  );
};
