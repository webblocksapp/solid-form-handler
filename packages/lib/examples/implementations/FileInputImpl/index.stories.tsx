import type { Meta } from 'storybook-solidjs';
import { FileInputImpl } from '.';
import { ySchema, zSchema } from './schemas';

const meta = {
  title: 'BS5 Implementations',
  component: FileInputImpl,
} satisfies Meta<typeof FileInputImpl>;

export default meta;

export const FileInputImplWithYup = () => <FileInputImpl schema={ySchema} />;
export const FileInputImplWithZod = () => <FileInputImpl schema={zSchema} />;
