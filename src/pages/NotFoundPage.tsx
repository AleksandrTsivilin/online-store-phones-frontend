import { FC, useEffect } from 'react';
import { NotFound } from '../components/NotFound';

const NotFoundPage: FC = () => {
  useEffect(() => {
    document.title = 'Not Found | Nice Gadgets';
  }, []);

  return (
    <NotFound />
  );
};

export default NotFoundPage;
