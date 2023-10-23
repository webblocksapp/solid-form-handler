const n=`//@ts-nocheck
type Company = {
  name: string;
  contact: {
    email: string;
    phone: string;
  };
};

const companySchema: yup.Schema<Company> = yup.object({
  name: yup.string().required(),
  contact: yup.object({
    email: yup.string().email().required(),
    phone: yup.string().required(),
  }),
});
`;export{n as default};
