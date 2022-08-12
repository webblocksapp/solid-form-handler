import { DocsContentLayout } from '@layouts';
import { Component } from 'solid-js';

export const Validations: Component = () => {
  return (
    <DocsContentLayout>
      <h2 class="mb-4 border-bottom">Validations</h2>
      <p>
        Each HTML form component must be threatened in a different way to
        validate its value. The following implementations show how to use the
        form handler at the most common vanilla HTML form components like text
        input, select, a single checkbox, or a group of checkboxes, radio
        buttons, and multi-select.
      </p>

      <p>
        For styling form components during validations, will be used Bootstrap
        5. Remember that you can adapt the given implementations to your CSS
        framework of preference.
      </p>
    </DocsContentLayout>
  );
};
