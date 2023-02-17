import type { Meta } from 'storybook-solidjs';
import { TextInputImpl } from '.';
import { ySchema, zSchema } from './schemas';

const meta = {
  title: 'BS5 Implementations',
  component: TextInputImpl,
} satisfies Meta<typeof TextInputImpl>;

export default meta;

export const TextInputImplWithYup = () => <TextInputImpl schema={ySchema} />;
export const TextInputImplWithZod = () => <TextInputImpl schema={zSchema} />;
