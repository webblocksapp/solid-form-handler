import { Component } from 'solid-js';
import { Implementation } from '@components';
import { getRaw } from '@utils';
import { MultiStepForm } from '@implementations';

export const ValidatingMultiStepForm: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Validating Multi Step Form</h2>
    <p>Content.</p>
    <Implementation code={getRaw('MultiStepForm')}>
      <MultiStepForm />
    </Implementation>
  </>
);
