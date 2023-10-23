const e=`//@ts-nocheck
<Field
  mode="radio-group"
  name="ageRange"
  formHandler={formHandler}
  render={(field) => (
    <>
      <For each={ageRanges}>
        {(ageRange, i) => (
          <div
            class="form-check"
            classList={{
              'is-invalid': field.helpers.error,
            }}
          >
            <input
              {...field.props}
              checked={field.helpers.isChecked(ageRange.value)}
              class="form-check-input"
              classList={{
                'is-invalid': field.helpers.error,
              }}
              id={\`\${field.props.id}-\${i()}\`}
              value={ageRange.value}
              type="radio"
            />
            <label for={\`\${field.props.id}-\${i()}\`} class="form-check-label">
              {ageRange.label}
            </label>
          </div>
        )}
      </For>
      <Show when={field.helpers.error}>
        <div class="invalid-feedback">{field.helpers.errorMessage}</div>
      </Show>
    </>
  )}
/>;
`;export{e as default};
//# sourceMappingURL=ValidatingRadios1-2ab2fcab.js.map
