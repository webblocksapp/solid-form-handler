import * as yup from 'yup';
import { User } from './types';

export const userSchema: yup.SchemaOf<User> = yup.object({
  name: yup.string().required('Required field'),
  email: yup.string().email('Invalid email').required('Email is required'),
  country: yup.number().required().typeError('Country is required'),
  favoriteFoods: yup.array(yup.number().required()).min(2),
  gender: yup.mixed().oneOf(['male', 'female', 'other']).required(),
  subscribed: yup.boolean().required().default(false),
});
