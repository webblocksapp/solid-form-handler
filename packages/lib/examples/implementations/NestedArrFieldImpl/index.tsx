import { useFormHandler } from '@hooks';
import { FormErrorsException } from '@utils';
import { yupSchema } from '@adapters';
import { Component, createSignal, For } from 'solid-js';
import * as yup from 'yup';

type Schema = {
  contacts: Array<{
    email: string;
    phone: string;
  }>;
};

const schema: yup.SchemaOf<Schema> = yup.object({
  contacts: yup
    .array(
      yup.object().shape({
        email: yup.string().required().email(),
        phone: yup.string().required(),
      })
    )
    .min(2),
});

export const NestedFieldArrImpl: Component = () => {
  const formHandler = useFormHandler<Schema>(yupSchema(schema));
  const [error, setError] = createSignal('');
  const { formData } = formHandler;

  const onInput = (event: Event) => {
    const { name, value } = event.currentTarget as HTMLInputElement;
    formHandler.setFieldValue(name, value);
  };

  const setContacts = () => {
    formHandler.setFieldValue('contacts', [{ email: 'xxx@mail.com', phone: '311 111 11 11' }]);
  };

  const setContactsDefaultValue = () => {
    formHandler.setFieldDefaultValue('contacts', [{ email: 'xxx@mail.com', phone: '311 111 11 11' }], {});
  };

  const setEmail = () => {
    formHandler.setFieldValue('contacts.0.email', 'xxx@mail.com');
  };

  const setEmailDefaultValue = () => {
    formHandler.setFieldDefaultValue('contacts.0.email', 'xxx@mail.com');
  };

  const fillForm = () => {
    formHandler.fillForm({
      contacts: [
        { email: 'test1@mail.com', phone: '311 454 43 23' },
        { email: 'test2@mail.com', phone: '312 455 55 52' },
      ],
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
      <h3>Nested Array Field Implementation</h3>
      <div style="display: flex">
        <div>
          <For each={formData().contacts}>
            {(_, i) => (
              <fieldset>
                <legend>Contact</legend>
                <div>
                  <label>Email</label>
                  <br />
                  <input
                    name={`contacts.${i()}.email`}
                    onInput={onInput}
                    value={formHandler.getFieldValue(`contacts.${i()}.email`)}
                  />
                  <br />
                  <small style="color: red;">{formHandler.getFieldError(`contacts.${i()}.email`)}</small>
                </div>
                <div>
                  <label>Phone</label>
                  <br />
                  <input
                    name={`contacts.${i()}.phone`}
                    onInput={onInput}
                    value={formHandler.getFieldValue(`contacts.${i()}.phone`)}
                  ></input>
                  <br />
                  <small style="color: red;">{formHandler.getFieldError(`contacts.${i()}.phone`)}</small>
                </div>
                <br />
                <small style="color: red">{formHandler.getFieldError('contacts')}</small>
                <br />
                <small data-testId="contact-status">
                  {formHandler.isFieldInvalid('contacts') ? 'Invalid' : 'Valid'}
                </small>
              </fieldset>
            )}
          </For>
          <div>
            <button type="button" onClick={setContacts}>
              Set Contacts
            </button>
            <button type="button" onClick={setContactsDefaultValue}>
              Set Contacts Default Value
            </button>
            <button type="button" onClick={setEmail}>
              setEmail
            </button>
            <button type="button" onClick={setEmailDefaultValue}>
              setEmailDefaultValue
            </button>
          </div>
        </div>
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
      <pre>
        <code>{JSON.stringify(formData())}</code>
      </pre>
    </form>
  );
};
