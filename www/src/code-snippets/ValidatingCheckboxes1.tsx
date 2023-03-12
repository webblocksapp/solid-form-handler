//@ts-nocheck
<Field
  mode="checkbox-group"
  name="favoriteFoods"
  formHandler={formHandler}
  render={(field) => (
    <>
      <For each={favoriteFoods}>
        {(favoriteFood, i) => (
          <div
            class="form-check"
            classList={{
              'is-invalid': field.helpers.error,
            }}
          >
            <input
              {...field.props}
              class="form-check-input"
              id={`${field.props.id}-${i()}`}
              checked={field.helpers.isChecked(favoriteFood.value)}
              classList={{
                'is-invalid': field.helpers.error,
              }}
              type="checkbox"
              value={favoriteFood.value}
            />
            <label for={`${field.props.id}-${i()}`} class="form-check-label">
              {favoriteFood.label}
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
