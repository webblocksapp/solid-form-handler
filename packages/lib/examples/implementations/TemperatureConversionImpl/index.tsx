import { TextInput } from '@components';
import { useFormHandler } from '@hooks';
import { yupSchema } from '@utils';
import { Component } from 'solid-js';
import * as yup from 'yup';

type Schema = {
  celsius: number;
  kelvin: number;
};

const schema: yup.SchemaOf<Schema> = yup.object({
  celsius: yup.number().required(),
  kelvin: yup.number().required(),
});

export const TemperatureConversionImpl: Component = () => {
  const formHandler = useFormHandler<Schema>(yupSchema(schema));
  const { formData } = formHandler;

  const submit = (event: Event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={submit}>
      <div class="row">
        <div class="col-6">
          <TextInput
            name="celsius"
            formHandler={formHandler}
            defaultValue={0}
            onInput={() => {
              formHandler.setFieldValue('kelvin', (Number(formData().celsius) + 273.15).toFixed(2));
            }}
          />
        </div>
        <div class="col-6">
          <TextInput
            name="kelvin"
            onInput={() => {
              formHandler.setFieldValue('celsius', (Number(formData().kelvin) - 273.15).toFixed(2));
            }}
            defaultValue={273.15}
            formHandler={formHandler}
          />
        </div>
      </div>
      <button disabled={formHandler.isFormInvalid()}>Submit</button>
      <pre>
        <code>{JSON.stringify(formData(), null, 2)}</code>
      </pre>
    </form>
  );
};
