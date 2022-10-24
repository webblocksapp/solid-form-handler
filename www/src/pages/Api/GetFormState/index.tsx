import { Component } from 'solid-js';
import { getRaw } from '@utils';
import { Code } from '@components';

export const GetFormState: Component = () => (
  <>
    <h2 class="mb-4 border-bottom">getFormState</h2>
    <p>
      This method returns an object which shows the user's interactions with the
      form.
    </p>
    <Code content={getRaw('getFormStateApi')} />
    <p>
      <b>Implementation:</b>
    </p>
    <Code content={getRaw('getFormState1')} />
    <p>
      <code>FormState</code> is composed by:
    </p>
    <ul>
      <li>
        <code>__state:</code> a placeholder to indicate this form field has an
        state. Always <code>true</code>.
      </li>
      <li>
        <code>__cache:</code> stores a cached state when methods{' '}
        <code>mountField</code> and <code>unmountField</code> are implemented.
        Ideally for conditional rendering of form fields to preserve it's
        previous state when re-mounted.
      </li>
      <li>
        <code>dataType:</code> contains the data type of the value given by the
        validation schema.
      </li>
      <li>
        <code>isInvalid:</code> is invalid boolean flag.
      </li>
      <li>
        <code>htmlElement:</code> contains the field html element.
      </li>
      <li>
        <code>errorMessage:</code> field validation error message.
      </li>
      <li>
        <code>defaultValue:</code> value the field takes when it's initialized
        or the form is reset.
      </li>
      <li>
        <code>initialValue:</code> first value the field takes when the form is
        initialized or filled.
      </li>
      <li>
        <code>currentValue:</code> contains the current value of the form field.
      </li>
      <li>
        <code>cachedValue:</code> a temporal cached value used for avoid
        re-triggering unnecessary validations if the current value doesn't have
        changes.
      </li>
      <li>
        <code>touched:</code> becomes <code>true</code> if the user has
        interacted with the form field.
      </li>
      <li>
        <code>interacted:</code> different from <code>touched</code>, becomes{' '}
        <code>true</code> if there is a programmatically interaction with the
        form field.
      </li>
      <li>
        <code>dirty:</code> becomes <code>true</code> if the field current value
        is different from initial value. Field current value is stored at{' '}
        <code>formData()</code>
      </li>
    </ul>
  </>
);
