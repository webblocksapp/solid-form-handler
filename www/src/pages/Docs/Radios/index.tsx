import { Component } from 'solid-js';
import { DocsContentLayout } from '@layouts';
import { Implementation } from '@components';
import { getRaw } from '@utils';
import { RadiosCompForm } from '@implementations';

export const Radios: Component = () => (
  <DocsContentLayout>
    <h2 class="mb-4 border-bottom">Radios</h2>
    <p>Content</p>
    <Implementation
      codeTabs={[
        { name: 'Form.tsx', code: getRaw('RadiosCompForm') },
        { name: 'Radios.tsx', code: getRaw('components/Radios') },
      ]}
    >
      <RadiosCompForm />
    </Implementation>
  </DocsContentLayout>
);
