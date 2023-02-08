import { z } from 'zod';

export const referralsSchema = z.object({
  hostName: z.string().min(1, 'hostName is required'),
  hostEmail: z.string().email(),
  referrals: z
    .array(
      z.object({
        name: z.string().min(1, 'name is required'),
        email: z.string().email(),
      })
    )
    .min(1, 'At least one referral must be added'),
});
