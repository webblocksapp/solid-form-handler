import * as yup from 'yup';
import { SchemaOf } from 'yup';

export type Person = {
  name: string;
  age: number;
};

export const personSchema: SchemaOf<Person> = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().typeError('age is a required field'),
});

export type Contact = {
  contact: Person;
};

export type Schema1 = {
  countries: number[];
};

export type Schema2 = {
  countries: { name: string }[];
};

export const contactSchema: SchemaOf<Contact> = yup.object().shape({
  contact: personSchema,
});

export const personsSchema: SchemaOf<Person[]> = yup.array(personSchema);

export type Referrals = {
  hostName: string;
  referrals: Person[];
};

export const referralsSchema: SchemaOf<Referrals> = yup.object({
  hostName: yup.string().required(),
  referrals: yup.array(
    yup.object().shape({
      name: yup.string().required(),
      age: yup.number().required(),
    })
  ),
});

export const triggersSchema = yup.object({
  password: yup
    .string()
    .required()
    .test({
      name: 'matches',
      test: (value, context) => {
        return value == context.parent['passwordConfirm'];
      },
      message: "Password doesn't match",
    }),
  passwordConfirm: yup
    .string()
    .required()
    .test({
      name: 'matches',
      test: (value, context) => {
        return value == context.parent['password'];
      },
      message: "Password doesn't match",
    }),
});

export const countriesSchema: SchemaOf<Schema1> = yup.object({ countries: yup.array(yup.number().required()).min(2) });
export const countriesObjSchema: SchemaOf<Schema2> = yup.object({
  countries: yup.array(yup.object({ name: yup.string().required() }).required()).min(2),
});
