const n=`import { Component } from 'solid-js';
import { Select } from '@components';
import { useFormContext } from './context';

export const Step2: Component = () => {
  const { formHandler } = useFormContext();

  return (
    <div class="row gy-3">
      <div class="col-12">
        <h3>Academic info:</h3>
      </div>
      <div class="col-12">
        <Select
          label="University"
          placeholder="Select an university"
          name="step2.university"
          formHandler={formHandler}
          options={[
            { value: 1, label: 'Oxford' },
            { value: 2, label: 'Illinois' },
            { value: 3, label: 'MIT' },
          ]}
        />
      </div>
      <div class="col-12">
        <Select
          label="Profession"
          placeholder="Select a profession"
          name="step2.profession"
          formHandler={formHandler}
          options={[
            { value: 1, label: 'Software Engineer' },
            { value: 2, label: 'Mathematician' },
            { value: 3, label: 'Physicist' },
            { value: 4, label: 'Medical' },
          ]}
        />
      </div>
      <div class="col-12">
        <Select
          label="Country"
          placeholder="Select a country"
          name="step2.country"
          options={[
            { value: 1, label: 'EEUU' },
            { value: 2, label: 'Canada' },
            { value: 3, label: 'México' },
          ]}
          formHandler={formHandler}
        />
      </div>
    </div>
  );
};
`;export{n as default};
//# sourceMappingURL=Step2-33621b3a.js.map
