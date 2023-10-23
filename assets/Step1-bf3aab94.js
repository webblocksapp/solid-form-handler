const n=`import { Radios, TextInput } from '@components';
import { Component } from 'solid-js';
import { useFormContext } from './context';

export const Step1: Component = () => {
  const { formHandler } = useFormContext();

  return (
    <div class="row gy-3">
      <div class="col-12">
        <h3>Personal info:</h3>
      </div>
      <div class="col-12">
        <TextInput
          label="First Name"
          name="step1.firstName"
          formHandler={formHandler}
        />
      </div>
      <div class="col-12">
        <TextInput
          label="Second Name"
          name="step1.secondName"
          formHandler={formHandler}
        />
      </div>
      <div class="col-12">
        <Radios
          label="Gender"
          name="step1.gender"
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
          ]}
          formHandler={formHandler}
        />
      </div>
    </div>
  );
};
`;export{n as default};
//# sourceMappingURL=Step1-bf3aab94.js.map
