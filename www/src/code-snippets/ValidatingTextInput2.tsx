//@ts-nocheck
<div>
  <label>Email</label>
  <input
    //...
    value={formHandler.getFieldValue('email')}
    //...
  />
  {formHandler.fieldHasError('email') && (
    <small>{formHandler.getFieldError('email')}</small>
  )}
</div>;
