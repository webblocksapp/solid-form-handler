import * as yup from 'yup';
import { User } from './types';

export const userSchema: yup.SchemaOf<User> = yup.object({
  name: yup.string().required('Required field'),
  email: yup.string().email('Invalid email').required('Email is required'),
});
