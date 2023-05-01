import * as yup from 'yup';
import { Referrals } from './types';

export const referralsSchema: yup.Schema<Referrals> = yup.object({
  hostName: yup.string().required(),
  hostEmail: yup.string().email().required(),
  referrals: yup
    .array(
      yup.object({
        name: yup.string().required(),
        email: yup.string().email().required(),
      })
    )
    .required()
    .min(1, 'At least one referral must be added'),
});
