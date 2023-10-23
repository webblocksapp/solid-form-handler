const schema = "import { z } from 'zod';\n\nexport const referralsSchema = z.object({\n  hostName: z.string().min(1, 'hostName is required'),\n  hostEmail: z.string().email(),\n  referrals: z\n    .array(\n      z.object({\n        name: z.string().min(1, 'name is required'),\n        email: z.string().email(),\n      })\n    )\n    .min(1, 'At least one referral must be added'),\n});\n";

export { schema as default };
