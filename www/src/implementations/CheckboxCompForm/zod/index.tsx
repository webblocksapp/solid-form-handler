import { Component } from 'solid-js';
import { useFormHandler } from 'solid-form-handler';
import { zodSchema } from 'solid-form-handler/zod';
import { z } from 'zod';
import { Checkbox } from '@components';

const schema = z.object({
  acceptPolicy: z.literal<boolean>(true, {
    errorMap: () => ({ message: 'Accept policy is required' }),
  }),
  acceptTerms: z.boolean(),
  accountStatus: z
    .string()
    .refine((value) => ['active', 'inactive'].some((item) => item === value)),
});

export const Form: Component = () => {
  const formHandler = useFormHandler(zodSchema(schema));
  const { formData } = formHandler;

  const submit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      alert('Data sent with success: ' + JSON.stringify(formData()));
      formHandler.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const reset = () => {
    formHandler.resetForm();
  };

  const fill = () => {
    formHandler.fillForm({
      acceptPolicy: true,
      acceptTerms: false,
      accountStatus: 'active',
    });
  };

  return (
    <form autocomplete="off" onSubmit={submit}>
      <h4 class="mb-3">Using zod schema</h4>
      <div class="mb-3">
        <Checkbox
          label="Accept policy"
          name="acceptPolicy"
          formHandler={formHandler}
        />
      </div>
      <div class="mb-3">
        <Checkbox
          label="Accept terms"
          name="acceptTerms"
          formHandler={formHandler}
          display="switch"
        />
      </div>
      <div class="mb-3">
        <Checkbox
          label={
            formData().accountStatus === 'active'
              ? 'Account active'
              : 'Account inactive'
          }
          value="active"
          uncheckedValue="inactive"
          name="accountStatus"
          formHandler={formHandler}
          display="switch"
        />
      </div>
      <div class="mb-3">
        <button class="btn btn-primary me-2">Submit</button>
        <button class="btn btn-primary me-2" onClick={reset} type="button">
          Reset
        </button>
        <button class="btn btn-primary me-2" onClick={fill} type="button">
          Fill
        </button>
      </div>
      <p>
        <b>Form data:</b>
      </p>
      <pre class="mt-3 border bg-light p-3">
        <code>{JSON.stringify(formData(), null, 2)}</code>
      </pre>
    </form>
  );
};
