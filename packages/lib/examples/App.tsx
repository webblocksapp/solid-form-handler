import { Link, Route, Routes } from 'solid-app-router';
import { Component } from 'solid-js';
import {
  CheckboxImpl,
  CheckboxesImpl,
  FormImpl,
  SelectImpl,
  TextInputImpl,
  ComplexFormImpl,
  FieldsetsFormImpl,
  NestedFieldsetsFormImpl,
  SortableFieldsetsFormImpl,
  StoreImpl,
  VanillaCompFormImpl,
  FieldsetsFormStress1,
} from '@implementations';
import './App.css';

export const App: Component = () => {
  return (
    <div style="display: grid; grid-template-columns: 200px 1fr">
      <div>
        <div>
          <Link href="checkbox-impl">checkbox-impl</Link>
        </div>
        <div>
          <Link href="checkboxes-impl">checkboxes-impl</Link>
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
          <Link href="nested-fieldsets-form-impl">nested-fieldsets-form-impl</Link>
        </div>
        <div>
          <Link href="sortable-fieldsets-form-impl">sortable-fieldsets-form-impl</Link>
        </div>
        <div>
          <Link href="store-impl">store-impl</Link>
        </div>
        <div>
          <Link href="vanilla-comp-form-impl">vanilla-comp-form-impl</Link>
        </div>
        <div>
          <Link href="fieldsets-form-stress-1">fieldsets-form-stress-1</Link>
        </div>
      </div>
      <Routes>
        <Route path="checkbox-impl" element={<CheckboxImpl />} />
        <Route path="checkboxes-impl" element={<CheckboxesImpl />} />
        <Route path="select-impl" element={<SelectImpl />} />
        <Route path="text-input-impl" element={<TextInputImpl />} />
        <Route path="form-impl" element={<FormImpl />} />
        <Route path="complex-form-impl" element={<ComplexFormImpl />} />
        <Route path="fieldsets-form-impl" element={<FieldsetsFormImpl />} />
        <Route path="nested-fieldsets-form-impl" element={<NestedFieldsetsFormImpl />} />
        <Route path="sortable-fieldsets-form-impl" element={<SortableFieldsetsFormImpl />} />
        <Route path="store-impl" element={<StoreImpl />} />
        <Route path="vanilla-comp-form-impl" element={<VanillaCompFormImpl />} />
        <Route path="fieldsets-form-stress-1" element={<FieldsetsFormStress1 />} />
      </Routes>
    </div>
  );
};
