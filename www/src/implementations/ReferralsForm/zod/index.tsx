import { Component, For } from 'solid-js';
import { useFormHandler, zodSchema } from 'solid-form-handler';
import { referralsSchema } from './schema';
import { TextInput } from '@components';

export const ReferralsForm: Component = () => {
  const formHandler = useFormHandler(zodSchema(referralsSchema));
  const { formData } = formHandler;
  const limit = 3;

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

  const fill = () => {
    formHandler.fillForm({
      hostName: 'John',
      hostEmail: 'john@mail.com',
      referrals: [{ name: 'Mike', email: 'mike@mail.com' }],
    });
  };

  const reset = () => {
    formHandler.resetForm();
  };

  return (
    <form class="container" onSubmit={submit}>
      <h4 class="mb-3">Using zod schema</h4>
      <div class="row gy-3">
        <div class="col-sm-12 col-md-6">
          <TextInput
            label="Host Name"
            name="hostName"
            formHandler={formHandler}
          />
        </div>
        <div class="col-sm-12 col-md-6">
          <TextInput
            label="Host Email"
            name="hostEmail"
            formHandler={formHandler}
          />
        </div>
        <div class="col-12">
          <h3>
            Referrals {formData().referrals.length} of {limit}
          </h3>
          <For each={formData().referrals}>
            {(_, i) => (
              <fieldset class="border m-3">
                {formData().referrals.length > 1 && (
                  <div class="bg-primary p-2 text-white d-flex justify-content-end">
                    {i() < formData().referrals.length - 1 && (
                      <i
                        style="cursor: pointer"
                        class="fa fa-chevron-down"
                        aria-hidden="true"
                        onClick={() =>
                          formHandler.moveFieldset(i(), i() + 1, 'referrals')
                        }
                      ></i>
                    )}
                    {i() > 0 && (
                      <i
                        style="cursor: pointer"
                        class="fa fa-chevron-up"
                        aria-hidden="true"
                        onClick={() =>
                          formHandler.moveFieldset(i(), i() - 1, 'referrals')
                        }
                      ></i>
                    )}
                  </div>
                )}
                <div class="p-2">
                  <div class="mb-3">
                    <TextInput
                      label="Name"
                      name={`referrals.${i()}.name`}
                      formHandler={formHandler}
                    />
                  </div>
                  <div class="mb-3">
                    <TextInput
                      label="Email"
                      name={`referrals.${i()}.email`}
                      formHandler={formHandler}
                    />
                  </div>
                  {formData().referrals.length > 1 && (
                    <button
                      class="btn btn-danger"
                      type="button"
                      onClick={() =>
                        formHandler.removeFieldset(i(), 'referrals')
                      }
                    >
                      Remove
                    </button>
                  )}
                </div>
              </fieldset>
            )}
          </For>
          <div class="w-100 mb-3">
            {formData().referrals.length < limit && (
              <button
                class="btn btn-info me-2 text-white"
                type="button"
                onClick={() =>
                  formHandler.addFieldset({ basePath: 'referrals' })
                }
              >
                Add product
              </button>
            )}
          </div>
        </div>
      </div>
      <div class="mb-3 w-100">
        <button class="btn btn-primary me-2 mt-2">Submit</button>
        <button
          class="btn btn-primary me-2 mt-2"
          disabled={formHandler.isFormInvalid()}
        >
          Submit
        </button>
        <button class="btn btn-primary me-2 mt-2" onClick={fill} type="button">
          Fill
        </button>
        <button class="btn btn-primary me-2 mt-2" onClick={reset} type="button">
          Reset
        </button>
      </div>
      <p class="mt-5">
        <b>Form data:</b>
      </p>
      <pre class="mt-3 border bg-light p-3">
        <code>{JSON.stringify(formData(), null, 2)}</code>
      </pre>
    </form>
  );
};
