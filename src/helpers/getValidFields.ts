import { ProductInfo } from '../types/Product';

export function getValidFields(category: string): (keyof ProductInfo)[] {
  const fields: (keyof ProductInfo)[] = [
    'screen',
    'resolution',
    'processor',
    'ram',
    'camera',
    'zoom',
    'cell',
  ];

  if (category === 'accessories') {
    return fields.filter((field) => (
      field !== 'zoom' && field !== 'camera'
    ));
  }

  return fields;
}
