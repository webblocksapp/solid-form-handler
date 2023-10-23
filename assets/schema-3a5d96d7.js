const r=`import * as yup from 'yup';
import { Product } from './types';

export const productSchema: yup.Schema<Product[]> = yup
  .array(
    yup.object({
      name: yup.string().required('Required field'),
      quantity: yup
        .number()
        .required('Quantity is required')
        .typeError('Write a valid quantity'),
    })
  )
  .required();
`;export{r as default};
