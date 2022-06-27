import { Link, Route, Routes } from 'solid-app-router';
import { Component } from 'solid-js';
import {
  CheckboxImpl,
  FormImpl,
  SelectImpl,
  TextInputImpl,
  ComplexFormImpl,
  FieldsetsFormImpl,
  SortableFieldsetsFormImpl,
} from '@implementations';

export const App: Component = () => {
  return (
    <div style="display: grid; grid-template-columns: 200px 1fr">
      <div>
        <div>
          <Link href="checkbox-impl">checkbox-impl</Link>
        </div>
        <div>
          <Link href="select-impl">select-impl</Link>
        </div>
        <div>
          <Link href="text-input-impl">text-input-impl</Link>
        </div>
        <div>
          <Link href="form-impl">form-impl</Link>
        </div>
        <div>
          <Link href="complex-form-impl">complex-form-impl</Link>
        </div>
        <div>
          <Link href="fieldsets-form-impl">fieldsets-form-impl</Link>
        </div>
        <div>
          <Link href="sortable-fieldsets-form-impl">sortable-fieldsets-form-impl</Link>
        </div>
      </div>
      <Routes>
        <Route path="/checkbox-impl" element={<CheckboxImpl />} />
        <Route path="/select-impl" element={<SelectImpl />} />
        <Route path="/text-input-impl" element={<TextInputImpl />} />
        <Route path="/form-impl" element={<FormImpl />} />
        <Route path="/complex-form-impl" element={<ComplexFormImpl />} />
        <Route path="/fieldsets-form-impl" element={<FieldsetsFormImpl />} />
        <Route path="/sortable-fieldsets-form-impl" element={<SortableFieldsetsFormImpl />} />
      </Routes>
    </div>
  );
};
