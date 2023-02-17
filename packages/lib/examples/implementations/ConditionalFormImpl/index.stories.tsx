import type { Meta } from 'storybook-solidjs';

import { ConditionalFormImpl } from '.';
import { ySchema, zSchema } from './schemas';

const meta = {
  title: 'BS5 Implementations',
  component: ConditionalFormImpl,
} satisfies Meta<typeof ConditionalFormImpl>;

export default meta;

export const ConditionalFormWithYup = () => <ConditionalFormImpl schema={ySchema} />;
export const ConditionalFormWithZod = () => <ConditionalFormImpl schema={zSchema} />;
