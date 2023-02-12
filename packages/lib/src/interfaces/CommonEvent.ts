export type CommonEvent = ((event: any) => void) | [(data: any, event: any) => void, any];
