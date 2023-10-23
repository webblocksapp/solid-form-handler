const schema = "import * as yup from 'yup';\nimport { Referrals } from './types';\n\nexport const referralsSchema: yup.Schema<Referrals> = yup.object({\n  hostName: yup.string().required(),\n  hostEmail: yup.string().email().required(),\n  referrals: yup\n    .array(\n      yup.object({\n        name: yup.string().required(),\n        email: yup.string().email().required(),\n      })\n    )\n    .required()\n    .min(1, 'At least one referral must be added'),\n});\n";

export { schema as default };
