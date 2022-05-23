import { Component } from 'solid-js';
import { TextInputImpl, SelectImpl, CheckboxImpl, FormImpl } from '@implementations';

export const App: Component = () => {
  return (
    <>
      <TextInputImpl />
      <SelectImpl />
      <CheckboxImpl />
      <FormImpl />
    </>
  );
};
