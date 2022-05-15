import { useFormHandler } from '@hooks';
import * as yup from 'yup';
import { SchemaOf } from 'yup';

type TestSchema = {
  name: string;
};

const schema: SchemaOf<TestSchema> = yup.object().shape({
  name: yup.string().required(),
});

describe('useFormHandler', () => {
  it('formHandler object must be defined', () => {
    const formHandler = useFormHandler(schema);
    expect(formHandler).toBeDefined();
  });

  it('If field path is no provided, the returned value is an empty string', () => {
    const formHandler = useFormHandler(schema);
    formHandler.initFormField('name', '');
    formHandler.setFieldValue('', 'George');
    expect(formHandler.getFieldValue('name')).toBe('');
  });

  it('Required name value, must be valid - with no error message', () => {
    const formHandler = useFormHandler(schema);
    formHandler.initFormField('name', '');
    formHandler.setFieldValue('name', 'George');
    expect(formHandler.getFieldError('name')).toBe('');
  });

  it('Required name value, must be invalid - with required error message', async () => {
    const formHandler = useFormHandler(schema);
    formHandler.initFormField('name', '');
    await formHandler.setFieldValue('name', '');
    expect(formHandler.getFieldError('name')).toBe('name is a required field');
  });
});
