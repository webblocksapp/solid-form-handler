import { Component } from 'solid-js';
import { useFormHandler } from '@hooks';
import { zodSchema } from '@utils';
import { z } from 'zod';

const schema = z.object({
  country: z.number().min(1, 'Country is required'),
});

export const SelectImpl: Component = () => {
  const formHandler = useFormHandler(zodSchema(schema));

  return (
    <>
      <div>
        <h3>Select implementation</h3>
        <label>Country</label>
        <br />
        <select
          data-testid="test-select"
          name="country"
          onchange={({ currentTarget: { name, value } }) => formHandler.setFieldValue(name, value)}
          onBlur={({ currentTarget: { name } }) => formHandler.validateField(name)}
        >
          <option value="">Select a country</option>
          <option value="1">Colombia</option>
          <option value="2">Argentina</option>
          <option value="3">Venezuela</option>
        </select>
        {formHandler.isFieldInvalid('country') && (
          <>
            <br />
            <small style="color: red">{formHandler.getFieldError('country')}</small>
          </>
        )}
      </div>
    </>
  );
};
