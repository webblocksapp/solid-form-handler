import { Component } from 'solid-js';
import { getRaw } from '@utils';
import { Code } from '@components';

export const FillForm: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">fillForm</h2>
    <p>
      This method allows to pre-load data inside a form. Also it validates the
      given data silently by default.
    </p>
    <Code content={getRaw('fillFormApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <p>Having the following schema:</p>
    <Code content={getRaw('schema1')} />
    <p>
      The form has the fields <code>name</code> and <code>age</code>, must be
      filled completely:
    </p>
    <Code content={getRaw('fillForm1')} />
    <p>
      <code>options</code> are composed by:
    </p>
    <ul>
      <li>
        <code>silentValidation:</code> by default is <code>true</code>. If set
        to <code>false</code> it shows the validation error messages after the
        form is filled.
      </li>
    </ul>
  </>
);
