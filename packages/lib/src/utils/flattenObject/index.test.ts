import { flattenObject } from '@utils';

describe('flattenObject', () => {
  it('CASE-1', () => {
    const flattenedObject = flattenObject({ name: 'John', age: 28 });
    expect(flattenedObject).toMatchObject({
      name: 'John',
      age: 28,
    });
  });

  it('CASE-2', () => {
    const flattenedObject = flattenObject([
      { name: 'John', age: 28 },
      { name: 'Laura', age: 32 },
    ]);

    expect(flattenedObject).toMatchObject({
      '0.name': 'John',
      '0.age': 28,
      '1.name': 'Laura',
      '1.age': 32,
    });
  });

  it('CASE-3', () => {
    const flattenedObject = flattenObject({
      name: 'John',
      contact: { email: 'john@test.com', phone: 7272232 },
      guests: [
        { name: 'Louise', age: 22 },
        { name: 'Lara', age: 26 },
      ],
    });

    expect(flattenedObject).toMatchObject({
      name: 'John',
      'contact.email': 'john@test.com',
      'contact.phone': 7272232,
      'guests.0.name': 'Louise',
      'guests.0.age': 22,
      'guests.1.name': 'Lara',
      'guests.1.age': 26,
    });
  });

  it('CASE-4', () => {
    const flattenedObject = flattenObject({
      favoriteFoods: [],
    });

    expect(flattenedObject).toMatchObject({
      favoriteFoods: [],
    });
  });
});
