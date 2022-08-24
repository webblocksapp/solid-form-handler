export type User = {
  name: string;
  email: string;
  country: number;
  favoriteFoods: number[];
  gender: 'male' | 'female' | 'other';
  subscribed: boolean;
};
