import { FC, useEffect } from 'react';
import { Main } from '../components/Main';

const MainPage: FC = () => {
  useEffect(() => {
    document.title = 'Nice Gadgets';
  }, []);

  return (
    <Main />
  );
};

export default MainPage;
