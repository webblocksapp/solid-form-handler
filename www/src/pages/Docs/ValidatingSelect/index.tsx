import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { Implementation } from '@components';
import { getRaw } from '@utils';
import { SingleSelectForm } from '@implementations';
import { Link } from '@solidjs/router';

export const ValidatingSelect: Component = () => (
  <DocsContentLayout
    prev="../validating-text-input"
    next="../validating-checkboxes"
  >
    <h2 class="mb-4 border-bottom">Validating Select</h2>
    <p>
      Native HTML select elements can have the same treatment as native HTML
      text inputs. The only difference is that it has added some logic for
      setting the default value which is the <code>option</code> HTML tag marked
      as selected.
    </p>
    <p>
      For doing select validation more legible, this logic can be abstracted
      into a{' '}
      <Link noScroll href="/docs/select">
        Select.tsx
      </Link>{' '}
      component.
    </p>
    <Implementation code={getRaw('SingleSelectForm')}>
      <SingleSelectForm />
    </Implementation>
  </DocsContentLayout>
);
