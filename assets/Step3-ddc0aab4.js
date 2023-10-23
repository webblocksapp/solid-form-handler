const n=`import { Component, For, Show } from 'solid-js';
import { useFormContext } from './context';
import { TextInput } from '@components';

export const Step3: Component = () => {
  const MAX_ITEMS = 3;
  const { formHandler } = useFormContext();
  const { formData } = formHandler;

  return (
    <div class="row gy-3">
      <div class="col-12">
        <h3>Contact info:</h3>
      </div>
      <For each={formData().step3.contact}>
        {(_, i) => (
          <div class="col-12">
            <div class="card">
              <div class="row gy-2 p-2">
                <div class="col-6">
                  <TextInput
                    label="Email"
                    name={\`step3.contact.\${i()}.email\`}
                    formHandler={formHandler}
                  />
                </div>
                <div class="col-6">
                  <TextInput
                    label="Phone"
                    name={\`step3.contact.\${i()}.phone\`}
                    formHandler={formHandler}
                  />
                </div>
                <Show when={formData().step3.contact.length > 1}>
                  <div class="col-12">
                    <button
                      class="btn btn-danger"
                      type="button"
                      onClick={() =>
                        formHandler.removeFieldset(i(), 'step3.contact')
                      }
                    >
                      Remove
                    </button>
                  </div>
                </Show>
              </div>
            </div>
          </div>
        )}
      </For>
      <Show when={formData().step3.contact.length < MAX_ITEMS}>
        <div class="col-12 d-flex justify-content-end">
          <button
            type="button"
            class="btn btn-primary"
            onClick={() =>
              formHandler.addFieldset({ basePath: 'step3.contact' })
            }
          >
            Add
          </button>
        </div>
      </Show>
    </div>
  );
};
`;export{n as default};
//# sourceMappingURL=Step3-ddc0aab4.js.map
