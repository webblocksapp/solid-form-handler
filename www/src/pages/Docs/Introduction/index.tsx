import { Component } from 'solid-js';
import { Implementation } from '@components';
import { SimpleForm } from '@implementations';
import { getRaw } from '@utils';

export const Introduction: Component = () => (
  <>
    <Implementation code={getRaw('SimpleForm')}>
      <SimpleForm />
    </Implementation>
  </>
);
