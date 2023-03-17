import { Component } from 'solid-js';
import { TextInput } from '@example-components';
import { useFormHandler } from '@hooks';
import { ValidationSchema } from '@interfaces';

export const TextInputImpl: Component<{ schema: ValidationSchema<any> }> = (props) => {
  const formHandler = useFormHandler(props.schema);

  const submit = async (event: Event) => {
    event.preventDefault();
    try {
      await formHandler.validateForm();
      alert(JSON.stringify(formHandler.formData()));
      formHandler.resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={submit}>
        <h3>Text input implementation</h3>
        <div class="mb-3">
          <TextInput data-testid="test-input" formHandler={formHandler} name="name" placeholder="Write your name" />
        </div>
        <div class="mb-3">
          <TextInput formHandler={formHandler} name="age" placeholder="Write your age" type="number" />
        </div>
        <button>Submit</button>
      </form>
    </>
  );
};
