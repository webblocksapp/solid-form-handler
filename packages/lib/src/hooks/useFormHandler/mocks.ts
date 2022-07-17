import * as yup from 'yup';
import { SchemaOf } from 'yup';

export type Person = {
  name: string;
  age: number;
};

export const personSchema: SchemaOf<Person> = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required(),
});

export type Contact = {
  contact: Person;
};

export const contactSchema: SchemaOf<Contact> = yup.object().shape({
  contact: personSchema,
});
