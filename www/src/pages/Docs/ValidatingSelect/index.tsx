import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { Implementation } from '@components';
import { getRaw } from '@utils';
import { SingleSelectForm } from '@implementations';

export const ValidatingSelect: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">Validating Select</h2>
    <p>
      Native HTML select elements can have the same treatment as native HTML
      text inputs. The only difference is that it has added some logic for
      setting the default value which is the <code>option</code> HTML tag marked
      as selected.
    </p>
    <Implementation code={getRaw('SingleSelectForm')}>
      <SingleSelectForm />
    </Implementation>
  </DocsContentLayout>
);
