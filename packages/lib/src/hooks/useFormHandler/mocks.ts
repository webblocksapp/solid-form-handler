import { ValidationSchema } from '@interfaces';
import { yupSchema } from '@utils';
import * as yup from 'yup';
import { SchemaOf } from 'yup';

export const TWO_COUNTRIES_EXPECTED = 'countries field must have at least 2 items';
export const AGE_IS_REQUIRED = 'age is a required field';
export const NAME_IS_REQUIRED = 'name is a required field';
export const PASSWORD_NOT_MATCH = `Password doesn't match`;
export const TWO_ERRORS_OCURRED = '2 errors occurred';

type Person = {
  name: string;
  age: number;
};

type Referrals = {
  hostName: string;
  referrals: Person[];
};

type Contact = {
  contact: Person;
};

type Triggers = {
  password: string;
  passwordConfirm: string;
};

type Schema1 = {
  countries: number[];
};

type Schema2 = {
  countries: { name: string }[];
};

export type ValidationSchemas = {
  personSchema: ValidationSchema<Person>;
  contactSchema: ValidationSchema<Contact>;
  personsSchema: ValidationSchema<Person[]>;
  referralsSchema: ValidationSchema<Referrals>;
  triggersSchema: ValidationSchema<Triggers>;
  countriesSchema: ValidationSchema<Schema1>;
  countriesObjSchema: ValidationSchema<Schema2>;
};

/**
 * ==================================
 * ----------- Yup shapes -----------
 * ==================================
 */
const yupPersonShape: SchemaOf<Person> = yup.object({
  name: yup.string().required(NAME_IS_REQUIRED),
  age: yup.number().required(AGE_IS_REQUIRED).typeError(AGE_IS_REQUIRED),
});
const yupContactShape: SchemaOf<Contact> = yup.object({
  contact: yupPersonShape,
});
const yupPersonsShape: SchemaOf<Person[]> = yup.array(yupPersonShape);
const yupReferralsShape: SchemaOf<Referrals> = yup.object({
  hostName: yup.string().required(),
  referrals: yup.array(
    yup.object().shape({
      name: yup.string().required(),
      age: yup.number().required(),
    })
  ),
});
const yupTriggersShape: SchemaOf<Triggers> = yup.object({
  password: yup
    .string()
    .required()
    .test({
      name: 'matches',
      test: (value, context) => {
        return value == context.parent['passwordConfirm'];
      },
      message: PASSWORD_NOT_MATCH,
    }),
  passwordConfirm: yup
    .string()
    .required()
    .test({
      name: 'matches',
      test: (value, context) => {
        return value == context.parent['password'];
      },
      message: PASSWORD_NOT_MATCH,
    }),
});
const yupCountriesShape: SchemaOf<Schema1> = yup.object({ countries: yup.array(yup.number().required()).min(2) });
const yupCountriesObjShape: SchemaOf<Schema2> = yup.object({
  countries: yup.array(yup.object({ name: yup.string().required() }).required()).min(2, TWO_COUNTRIES_EXPECTED),
});

export const yupSchemas: ValidationSchemas = {
  personSchema: yupSchema<Person>(yupPersonShape),
  contactSchema: yupSchema<Contact>(yupContactShape),
  personsSchema: yupSchema<Person[]>(yupPersonsShape),
  referralsSchema: yupSchema<Referrals>(yupReferralsShape),
  triggersSchema: yupSchema<Triggers>(yupTriggersShape),
  countriesSchema: yupSchema<Schema1>(yupCountriesShape),
  countriesObjSchema: yupSchema<Schema2>(yupCountriesObjShape),
};
