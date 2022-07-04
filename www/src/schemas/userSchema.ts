import * as yup from 'yup';

export type Contact = {
  phone: string;
  email: string;
};

export type User = {
  name: string;
  age: number;
  birthDate: Date;
  contacts: Contact[];
};

export const userSchema: yup.SchemaOf<User> = yup.object({
  name: yup.string().required(),
  age: yup.number().required(),
  birthDate: yup.date().required(),
  contacts: yup
    .array(
      yup.object({
        phone: yup.string().required(),
        email: yup.string().email().required(),
      })
    )
    .min(1),
});
