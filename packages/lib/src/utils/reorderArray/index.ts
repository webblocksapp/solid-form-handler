export const reorderArray = (array: any[], oldIndex: number, newIndex: number) => {
  const items = [...array];
  const [item] = items.splice(oldIndex, 1);
  items.splice(newIndex, 0, item);
  return items;
};
