import type { Meta } from 'storybook-solidjs';
import { SelectImpl } from '.';
import { ySchema, zSchema } from './schemas';

const meta = {
  title: 'BS5 Implementations',
  component: SelectImpl,
} satisfies Meta<typeof SelectImpl>;

export default meta;

export const SelectWithYup = () => <SelectImpl schema={ySchema} />;
export const SelectWithZod = () => <SelectImpl schema={zSchema} />;
