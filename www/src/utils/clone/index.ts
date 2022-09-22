export const clone = <T>(data: T): T => {
  return JSON.parse(JSON.stringify(data));
};
