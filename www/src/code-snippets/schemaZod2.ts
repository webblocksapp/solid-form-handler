//@ts-nocheck
const companySchema = z.object({
  name: z.string().min(1, 'name is required'),
  contact: z.object({
    email: z.string().email(),
    phone: z.string().min(1, 'name is required'),
  }),
});
