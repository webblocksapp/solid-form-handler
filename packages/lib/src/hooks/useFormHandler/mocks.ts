import { ValidationSchema } from '@interfaces';
import { yupSchema, zodSchema } from '@utils';
import { z } from 'zod';
import * as yup from 'yup';
import { SchemaOf } from 'yup';

export const TWO_COUNTRIES_EXPECTED = 'countries field must have at least 2 items';
export const AGE_IS_REQUIRED = 'age is a required field';
export const NAME_IS_REQUIRED = 'name is a required field';
export const HOSTNAME_IS_REQUIRED = 'hostname is a required field';
export const PASSWORD_IS_REQUIRED = 'password is a required field';
export const PASSWORD_CONFIRM_IS_REQUIRED = 'password confirm is a required field';
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
  hostName: yup.string().required(HOSTNAME_IS_REQUIRED),
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

/**
 * ==================================
 * ----------- zod shapes -----------
 * ==================================
 */

const zodPersonShape = z.object({
  name: z.string().min(1, NAME_IS_REQUIRED),
  age: z.coerce.number().gte(1, AGE_IS_REQUIRED),
});

const zodContactShape = z.object({
  contact: zodPersonShape,
});

const zodPersonsShape = z.array(zodPersonShape);

const zodReferralsShape = z.object({
  hostName: z.string().min(1, HOSTNAME_IS_REQUIRED),
  referrals: z.array(zodPersonShape),
});

const zodTriggersShape = z
  .object({
    password: z.string().min(1, PASSWORD_IS_REQUIRED),
    passwordConfirm: z.string().min(1, PASSWORD_CONFIRM_IS_REQUIRED),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: 'custom',
        path: ['password'],
        message: PASSWORD_NOT_MATCH,
      });

      ctx.addIssue({
        code: 'custom',
        path: ['passwordConfirm'],
        message: PASSWORD_NOT_MATCH,
      });
    }
  });

const zodCountriesShape = z.object({ countries: z.array(z.number()).min(2, TWO_COUNTRIES_EXPECTED) });
const zodCountriesObjShape = z.object({
  countries: z.array(z.object({ name: z.string().min(1) })).min(2, TWO_COUNTRIES_EXPECTED),
});

/**
 * Exports
 */
export const yupSchemas: ValidationSchemas = {
  personSchema: yupSchema<Person>(yupPersonShape),
  contactSchema: yupSchema<Contact>(yupContactShape),
  personsSchema: yupSchema<Person[]>(yupPersonsShape),
  referralsSchema: yupSchema<Referrals>(yupReferralsShape),
  triggersSchema: yupSchema<Triggers>(yupTriggersShape),
  countriesSchema: yupSchema<Schema1>(yupCountriesShape),
  countriesObjSchema: yupSchema<Schema2>(yupCountriesObjShape),
};

export const zodSchemas: ValidationSchemas = {
  personSchema: zodSchema<Person>(zodPersonShape),
  contactSchema: zodSchema<Contact>(zodContactShape),
  personsSchema: zodSchema<Person[]>(zodPersonsShape),
  referralsSchema: zodSchema<Referrals>(zodReferralsShape),
  triggersSchema: zodSchema<Triggers>(zodTriggersShape),
  countriesSchema: zodSchema<Schema1>(zodCountriesShape),
  countriesObjSchema: zodSchema<Schema2>(zodCountriesObjShape),
};
