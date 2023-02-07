import { Tabs } from '@components';
import { Component } from 'solid-js';
import { SetupCmd } from './SetupCmd';

export const Setup: Component = () => {
  return (
    <>
      <h2 class="mb-4 border-bottom">Setup</h2>
      <Tabs
        tabs={[
          {
            text: 'yup',
            children: <SetupCmd validatorLib="yup" />,
          },
          {
            text: 'zod',
            children: <SetupCmd validatorLib="zod" />,
          },
        ]}
      />
    </>
  );
};
