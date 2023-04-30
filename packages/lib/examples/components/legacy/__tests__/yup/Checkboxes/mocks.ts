import * as yup from 'yup';

export type Schema = {
  favoriteFoods: Array<number>;
};

export const schema: yup.Schema<Schema> = yup.object().shape({
  favoriteFoods: yup.array(yup.number().required()).min(1, 'favoriteFoods is a required field').required(),
});

export const FAVORITE_FOODS = [
  { value: 1, label: 'Pizza' },
  { value: 2, label: 'Hot Dog' },
  { value: 3, label: 'Ice Cream' },
];
