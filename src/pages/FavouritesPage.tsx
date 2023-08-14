import { FC, useEffect } from 'react';
import { Favourites } from '../components/Favourites';

const FavouritesPage: FC = () => {
  useEffect(() => {
    document.title = 'Favourites | Nice Gadgets';
  }, []);

  return (
    <Favourites />
  );
};

export default FavouritesPage;
