import accessories from '../../assets/images/home-category-accessories.png';
import phones from '../../assets/images/home-category-phones.png';
import tablets from '../../assets/images/home-category-tablets.png';

export interface CategoryData {
  id: number;
  imageSrc: string;
  alt: string;
  linkTo: string;
  productName: string;
}

export const categoriesData: CategoryData[] = [
  {
    id: 1,
    imageSrc: phones,
    alt: 'Phones',
    linkTo: '/phones',
    productName: 'Mobile Phones',
  },
  {
    id: 2,
    imageSrc: tablets,
    alt: 'Tablets',
    linkTo: '/tablets',
    productName: 'Tablets',
  },
  {
    id: 3,
    imageSrc: accessories,
    alt: 'Accessories',
    linkTo: '/accessories',
    productName: 'Accessories',
  },
];
