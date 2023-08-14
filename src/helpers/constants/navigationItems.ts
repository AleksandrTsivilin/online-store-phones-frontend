export interface NavigationItem {
  id: number;
  title: string;
  path: string;
}

export const navigationItems: NavigationItem[] = [
  { id: 1, title: 'Home', path: '/' },
  { id: 2, title: 'Phones', path: 'phones' },
  { id: 3, title: 'Tablets', path: 'tablets' },
  { id: 4, title: 'Accessories', path: 'accessories' },
];
