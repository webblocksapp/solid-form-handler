import { Link, Outlet, Route, Routes } from 'solid-app-router';
import { Component, createSignal } from 'solid-js';
import {
  AsyncValidationImpl,
  CheckboxImpl,
  CheckboxesImpl,
  CheckboxCompForm,
  FormImpl,
  YupSelectImpl,
  ZodSelectImpl,
  ComplexFormImpl,
  FieldsetsFormImpl,
  NestedFieldsetsFormImpl,
  SortableFieldsetsFormImpl,
  VanillaCompFormImpl,
  FieldsetsFormStress1,
  YupConditionalFormImpl,
  ReferralsForm,
  TemperatureConversionImpl,
  DependantValidationImpl,
  ValidateOnImpl,
  ValidateFileInputImpl,
  SuidFormImpl,
  YupTextInputImpl,
  ZodTextInputImpl,
  ZodConditionalFormImpl,
} from '@implementations';
import './App.css';

export const App: Component = () => {
  const [lib, setLib] = createSignal('yup');

  return (
    <>
      <div style="display: flex">
        <div style="margin-right: 20px">
          <Link href="yup" onClick={() => setLib('yup')}>
            YUP
          </Link>
        </div>
        <Link href="zod" onClick={() => setLib('zod')}>
          Zod
        </Link>
      </div>
      <div style="display: grid; grid-template-columns: 300px 1fr">
        <Routes>
          <Route
            path={lib()}
            element={
              <>
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
                    <Link href="vanilla-comp-form-impl">vanilla-comp-form-impl</Link>
                  </div>
                  <div>
                    <Link href="fieldsets-form-stress-1">fieldsets-form-stress-1</Link>
                  </div>
                  <div>
                    <Link href="conditional-form-impl">conditional-form-impl</Link>
                  </div>
                  <div>
                    <Link href="referrals-form">referrals-form</Link>
                  </div>
                  <div>
                    <Link href="checkbox-comp-form">checkbox-comp-form</Link>
                  </div>
                  <div>
                    <Link href="temperature-conversion">temperature-conversion</Link>
                  </div>
                  <div>
                    <Link href="async-validation-impl">async-validation-impl</Link>
                  </div>
                  <div>
                    <Link href="dependant-validation-impl">dependant-validation-impl</Link>
                  </div>
                  <div>
                    <Link href="validate-on-impl">validate-on-impl</Link>
                  </div>
                  <div>
                    <Link href="validate-file-input">validate-file-input</Link>
                  </div>
                  <div>
                    <Link href="suid-form">suid-form</Link>
                  </div>
                </div>
                <Outlet />
              </>
            }
          />
          <Route path="yup">
            <Route path="checkbox-impl" element={<CheckboxImpl />} />
            <Route path="checkboxes-impl" element={<CheckboxesImpl />} />
            <Route path="select-impl" element={<YupSelectImpl />} />
            <Route path="text-input-impl" element={<YupTextInputImpl />} />
            <Route path="form-impl" element={<FormImpl />} />
            <Route path="complex-form-impl" element={<ComplexFormImpl />} />
            <Route path="fieldsets-form-impl" element={<FieldsetsFormImpl />} />
            <Route path="nested-fieldsets-form-impl" element={<NestedFieldsetsFormImpl />} />
            <Route path="sortable-fieldsets-form-impl" element={<SortableFieldsetsFormImpl />} />
            <Route path="vanilla-comp-form-impl" element={<VanillaCompFormImpl />} />
            <Route path="fieldsets-form-stress-1" element={<FieldsetsFormStress1 />} />
            <Route path="conditional-form-impl" element={<YupConditionalFormImpl />} />
            <Route path="referrals-form" element={<ReferralsForm />} />
            <Route path="checkbox-comp-form" element={<CheckboxCompForm />} />
            <Route path="temperature-conversion" element={<TemperatureConversionImpl />} />
            <Route path="async-validation-impl" element={<AsyncValidationImpl />} />
            <Route path="dependant-validation-impl" element={<DependantValidationImpl />} />
            <Route path="validate-on-impl" element={<ValidateOnImpl />} />
            <Route path="validate-file-input" element={<ValidateFileInputImpl />} />
            <Route path="suid-form" element={<SuidFormImpl />} />
          </Route>
          <Route path="zod">
            {/* <Route path="checkbox-impl" element={<ZodCheckboxImpl />} /> */}
            {/* <Route path="checkboxes-impl" element={<ZodCheckboxesImpl />} /> */}
            <Route path="select-impl" element={<ZodSelectImpl />} />
            <Route path="text-input-impl" element={<ZodTextInputImpl />} />
            {/* <Route path="form-impl" element={<ZodFormImpl />} /> */}
            {/* <Route path="complex-form-impl" element={<ZodComplexFormImpl />} /> */}
            {/* <Route path="fieldsets-form-impl" element={<ZodFieldsetsFormImpl />} /> */}
            {/* <Route path="nested-fieldsets-form-impl" element={<ZodNestedFieldsetsFormImpl />} /> */}
            {/* <Route path="sortable-fieldsets-form-impl" element={<ZodSortableFieldsetsFormImpl />} /> */}
            {/* <Route path="vanilla-comp-form-impl" element={<ZodVanillaCompFormImpl />} /> */}
            {/* <Route path="fieldsets-form-stress-1" element={<ZodFieldsetsFormStress1 />} /> */}
            <Route path="conditional-form-impl" element={<ZodConditionalFormImpl />} />
            {/* <Route path="referrals-form" element={<ZodReferralsForm />} /> */}
            {/* <Route path="checkbox-comp-form" element={<ZodCheckboxCompForm />} /> */}
            {/* <Route path="temperature-conversion" element={<ZodTemperatureConversionImpl />} /> */}
            {/* <Route path="async-validation-impl" element={<ZodAsyncValidationImpl />} /> */}
            {/* <Route path="dependant-validation-impl" element={<ZodDependantValidationImpl />} /> */}
            {/* <Route path="validate-on-impl" element={<ZodValidateOnImpl />} /> */}
            {/* <Route path="validate-file-input" element={<ZodValidateFileInputImpl />} /> */}
            {/* <Route path="suid-form" element={<ZodSuidFormImpl />} /> */}
          </Route>
        </Routes>
      </div>
    </>
  );
};
