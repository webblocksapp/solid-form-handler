const n=`import { Component, createSignal, Match, Switch, Show } from 'solid-js';
import { useFormHandler } from 'solid-form-handler';
import { zodSchema } from 'solid-form-handler/zod';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { schema } from './schema';
import { FormContext } from './context';

export const Form: Component = () => {
  const [step, setStep] = createSignal(1);
  const formHandler = useFormHandler(zodSchema(schema));

  const submit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      alert(JSON.stringify(formHandler.formData()));
      formHandler.resetForm();
      setStep(1);
    } catch (error) {
      console.error(error);
    }
  };

  const next = () => {
    setStep((prev) => prev + 1);
  };

  const back = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <FormContext.Provider value={{ formHandler }}>
      <form onSubmit={submit}>
        <h4 class="mb-3">Using zod schema</h4>
        <div class="row gy-3">
          <div class="col-12">
            <Switch>
              <Match when={step() === 1}>
                <Step1 />
              </Match>
              <Match when={step() === 2}>
                <Step2 />
              </Match>
              <Match when={step() === 3}>
                <Step3 />
              </Match>
            </Switch>
          </div>
          <div class="col-12 d-flex justify-content-end">
            <Show when={step() > 1}>
              <button type="button" class="btn btn-primary me-2" onClick={back}>
                Back
              </button>
            </Show>
            <Show when={step() < 3}>
              <button
                type="button"
                class="btn btn-primary"
                disabled={formHandler.isFieldInvalid(\`step\${step()}\`)}
                onClick={next}
              >
                Next
              </button>
            </Show>
            <Show when={step() === 3}>
              <button
                class="btn btn-primary ms-2"
                disabled={formHandler.isFormInvalid()}
              >
                Submit
              </button>
            </Show>
          </div>
        </div>
      </form>
    </FormContext.Provider>
  );
};
`;export{n as default};
