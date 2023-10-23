const n=`export type Schema = {
  step1: {
    firstName: string;
    secondName: string;
    gender: 'male' | 'female' | 'other';
  };
  step2: {
    university: number;
    profession: number;
    country: number;
  };
  step3: {
    contact: Array<{ email: string; phone?: string }>;
  };
};
`;export{n as default};
