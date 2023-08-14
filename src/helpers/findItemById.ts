export const findItemById = <I extends { id: string | number }>(
  items: I[], id: string | number,
): I | undefined => items.find(item => item.id === id);
