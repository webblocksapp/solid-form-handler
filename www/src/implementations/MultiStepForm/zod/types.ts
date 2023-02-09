import { z } from 'zod';
import { schema } from './schema';

export type Schema = z.infer<typeof schema>;
