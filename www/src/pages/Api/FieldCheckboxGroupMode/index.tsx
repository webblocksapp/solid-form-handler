import { Component } from 'solid-js';
import { getRaw } from '@utils';
import { Code } from '@components';
import { Link } from '@solidjs/router';

export const FieldCheckboxGroupMode: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">Field In Checkbox Group Mode</h2>
    <Code content={getRaw('CheckboxFieldApi')} />
    <p>
      <code>CheckboxGroupFieldStore</code> is composed by:
    </p>
    <ul>
      <li>
        <code>props.value:</code> current form handler field value.
      </li>
      <li>
        <code>props.id:</code> id prop reflected from the field component.
      </li>
      <li>
        <code>props.name:</code> name prop reflected from the field component.
      </li>
      <li>
        <code>props.onChange:</code> event that matches a native{' '}
        <code>onChange</code> event signature.
      </li>
      <li>
        <code>props.onBlur:</code> event that matches a native{' '}
        <code>onBlur</code> event signature.
      </li>
    </ul>
    <ul>
      <li>
        <code>helpers.errorMessage:</code> form handler computed error message.
      </li>
      <li>
        <code>helpers.error:</code> form handler computed error flag.
      </li>
      <li>
        <code>helpers.onValueChange:</code> wildcard method in case{' '}
        <code>prop.onChange</code> doesn't match the expected signature of the
        field component.
      </li>
      <li>
        <code>helpers.onFieldBlur:</code> wildcard method in case{' '}
        <code>prop.onBlur</code> doesn't match the expected signature of the
        field component.
      </li>
      <li>
        <code>helpers.getPropsExcept:</code> helper function for filtering{' '}
        <code>field.props</code>.
      </li>
      <li>
        <code>helpers.isChecked:</code> helper function for checking if an
        option is checked.
      </li>
    </ul>
    <p>
      <b>Examples:</b>
    </p>
    <ul>
      <li>
        <Link href="../../docs/validating-checkboxes">
          Validating Checkboxes
        </Link>
      </li>
    </ul>
  </>
);
