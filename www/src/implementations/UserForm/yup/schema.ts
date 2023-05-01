import * as yup from 'yup';
import { User } from './types';

export const userSchema: yup.Schema<User> = yup.object({
  name: yup.string().required('Required field'),
  email: yup.string().email('Invalid email').required('Email is required'),
  country: yup.number().required().typeError('Country is required'),
  favoriteFoods: yup.array(yup.number().required()).required().min(2),
  gender: yup
    .mixed<User['gender']>()
    .oneOf(['male', 'female', 'other'])
    .required(),
  subscribed: yup.boolean().required().default(false),
});
