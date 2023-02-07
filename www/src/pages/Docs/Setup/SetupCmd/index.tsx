import { Code } from '@components';
import { Component } from 'solid-js';

export interface SetupCmdProps {
  validatorLib: 'yup' | 'zod';
}

export const SetupCmd: Component<SetupCmdProps> = (props) => (
  <div class="p-4">
    <div class="mb-5">
      <b>npm installation:</b>
      <Code>{`npm i solid-form-handler ${props.validatorLib}`}</Code>
    </div>
    <div>
      <b>yarn installation:</b>
      <Code>{`yarn add solid-form-handler ${props.validatorLib}`}</Code>
    </div>
  </div>
);
